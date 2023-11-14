import {Container, Menu, Image, Icon, Button} from "semantic-ui-react";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AppUserContext} from "../context/StateContext.tsx";


const NavBar = () => {

    const { appUser, setAppUser } = useContext(AppUserContext);

    const navigate = useNavigate();



    const handleLogout = () => {

        localStorage.removeItem("ecommerce_user");

        setAppUser(undefined);

        navigate("/login");

    }

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/vite.svg' style={{ marginRight: '1.5em' }} />
                    D1 - Tech
                </Menu.Item>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/orders">Orders</Menu.Item>
                <Menu.Item as={NavLink} to="/cart"><Icon name="cart" /></Menu.Item>
                <Menu.Item as={NavLink} to="/about">About</Menu.Item>
                {!appUser && <Menu.Item as={NavLink} to="/login" position="right"><Icon name="sign-in" /> Login</Menu.Item>}
                {appUser && <Menu.Item as={Button} onClick={handleLogout} position="right"><Icon name="sign-out" /> Logout</Menu.Item>}
            </Container>
        </Menu>
    );
}

export default  NavBar;