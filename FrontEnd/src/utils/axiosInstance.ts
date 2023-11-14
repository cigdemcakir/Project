import axios from 'axios';
import { LocalJwt } from "../types/AuthTypes.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: BASE_URL
});

const refreshAccessToken = async () => {
    try {
        const refreshToken = "";

        const response = await axios.post(`${BASE_URL}/Authentication/RefreshToken`, { refreshToken });

        const localJwt: LocalJwt = response.data;

        localStorage.setItem("ecommerce_user", JSON.stringify(localJwt));

        return localJwt.accessToken;

    } catch (error) {

        throw error;
    }
};


api.interceptors.request.use((config)=>{

    const jwtJson = localStorage.getItem("ecommerce_user");

    if(jwtJson){

        const localJwt:LocalJwt =JSON.parse(jwtJson);

        config.headers["Authorization"] = `Bearer ${localJwt.accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshAccessToken();

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                return axios(originalRequest);

            } catch (refreshError) {

                throw refreshError;
            }
        }

        return Promise.reject(error);
    }
);

export default api;



