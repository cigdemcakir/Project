import './styles/App.css'
import NavBar from './components/NavBar.tsx';
import {ToastContainer} from 'react-toastify';
import {Container} from "semantic-ui-react";
import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import {OrderGetAllDto} from "./types/OrderTypes.ts";
import {LocalJwt, LocalUser} from "./types/AuthTypes.ts";
import LoginPage from "./pages/LoginPage.tsx";
import {getClaimsFromJwt} from "./utils/jwtHelper.ts";
import {useNavigate} from "react-router-dom";
import {AppUserContext, OrdersContext} from "./context/StateContext.tsx";
import {dummyAccounts} from "./utils/dummyData.ts";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import OrdersAddPage from "./pages/OrdersAddPage.tsx";
import SocialLogin from "./pages/SocialLogin.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import {CartProvider} from "./context/CartContex.tsx";

function App() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState<OrderGetAllDto[]>(dummyAccounts);

    const [appUser, setAppUser] = useState<LocalUser | undefined>(undefined);


    useEffect(() => {

        const jwtJson = localStorage.getItem("d1tech_user");

        if (!jwtJson) {
            navigate("/login");
            return;
        }

        const localJwt: LocalJwt = JSON.parse(jwtJson);

        const {uid, email, given_name, family_name} = getClaimsFromJwt(localJwt.accessToken);

        const expires: string = localJwt.expires;

        setAppUser({
            id: uid,
            email,
            firstName: given_name,
            lastName: family_name,
            expires,
            accessToken: localJwt.accessToken
        });


    }, []);

    return (
        <>
            <AppUserContext.Provider value={{appUser, setAppUser}}>
                <OrdersContext.Provider value={{orders, setOrders}}>
                    <CartProvider>
                    <ToastContainer/>
                    <NavBar />
                    <Container className="App">
                        <Routes>
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <ProductsPage />
                                </ProtectedRoute>
                            }/>
                            <Route path="/orders" element={
                                <ProtectedRoute>
                                    <OrdersPage />
                                </ProtectedRoute>
                            }/>
                            <Route path="/about" element={
                                <ProtectedRoute>
                                    <AboutPage />
                                </ProtectedRoute>
                            }/>
                            <Route path="/cart" element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            }/>
                            <Route path="/orders/add" element={
                                <ProtectedRoute>
                                    <OrdersAddPage />
                                </ProtectedRoute>
                            }/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/social-login" element={<SocialLogin/>}/>
                        </Routes>
                    </Container>
                    </CartProvider>
                </OrdersContext.Provider>
            </AppUserContext.Provider>
        </>
    )

}


export default App