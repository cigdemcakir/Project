import {AuthLoginCommand, LocalJwt} from "../types/AuthTypes.ts";
import React, {useContext, useState} from "react";
import {Button, Form, FormInput, Grid, Header, Icon, Image, Segment} from "semantic-ui-react";
import api from "../utils/axiosInstance.ts";
import {getClaimsFromJwt} from "../utils/jwtHelper.ts";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from '/vite.svg';
import {AppUserContext} from "../context/StateContext.tsx";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


function LoginPage() {

    const { setAppUser } = useContext(AppUserContext);

    const navigate = useNavigate();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [registerData, setRegisterData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const [authLoginCommand, setAuthLoginCommand] = useState<AuthLoginCommand>({email:"",password:""});

    const handleSubmit = async (event:React.FormEvent) => {

        event.preventDefault();

        try {
            const response = await api.post("/Authentication/Login", authLoginCommand);

            if(response.status === 200){

                const accessToken = response.data.accessToken;

                const { uid, email, given_name, family_name} = getClaimsFromJwt(accessToken);

                const expires:string = response.data.expires;

                setAppUser({ id:uid, email, firstName:given_name, lastName:family_name, expires, accessToken });

                const localJwt:LocalJwt ={

                    accessToken,
                    expires
                }

                localStorage.setItem("ecommerce_user",JSON.stringify(localJwt));
                navigate("/");

            } else{

                toast.error(response.statusText);
            }
        } catch (error) {

            toast.error("Something went wrong!");
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7109/api/Authentication/Register', registerData);
            if (response.status === 200) {
                toast.success('Registration Successful!');
                setIsModalVisible(false);
            }
        } catch (error) {
            toast.error('An error occurred while registering!');
        }
    };
    const handleSignInInputChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleSignInClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthLoginCommand({
            ...authLoginCommand,
            [event.target.name]: event.target.value
        });
    }

    const onGoogleLoginClick = (e:React.FormEvent) => {
        e.preventDefault();

        window.location.href = `${BASE_URL}/Authentication/GoogleSignInStart`;
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={logo} size='small' centered style={{ marginTop: '4em' }} />
                <Header as='h2' color='teal' textAlign='center' style={{ marginTop: '2em' }}>
                    Log-in to Your Account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            value={authLoginCommand.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={authLoginCommand.password}
                            onChange={handleInputChange}
                            name="password"
                        />

                        <Button color='teal' fluid size='large' type="submit">
                            Login
                        </Button>


                        <Button color='purple' fluid onClick={onGoogleLoginClick} size='large' style={{marginTop:"5px"}} type="button">
                            <Icon name='google' /> Sign in with Google
                        </Button>
                    </Segment>
            </Form>
                <Button color='teal' size='medium' onClick={handleSignInClick}>Sign In</Button>
            {isModalVisible && (
                <Form onSubmit={handleRegisterSubmit}>
                    <Segment>
                        <FormInput type="text" name="firstName" placeholder="Ad" onChange={handleSignInInputChange} />
                        <FormInput type="text" name="lastName" placeholder="Soyad" onChange={handleSignInInputChange} />
                        <FormInput type="email" name="email" placeholder="E-posta" onChange={handleSignInInputChange} />
                        <FormInput type="password" name="password" placeholder="Şifre" onChange={handleSignInInputChange} />
                        <Button color='teal' size='medium' type="submit">Sign In!</Button>
                        <Button color='teal' size='medium' onClick={handleCloseModal}>Close</Button>
                    </Segment>
                </Form>
            )}
            </Grid.Column>
        </Grid>
    );
}

export default LoginPage;
