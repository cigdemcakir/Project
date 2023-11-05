import {Container, Menu, Image, Icon, Button} from "semantic-ui-react";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {OrdersContext, AppUserContext} from "../context/StateContext.tsx";


const NavBar = () => {

    const { appUser, setAppUser } = useContext(AppUserContext);

    const { orders } = useContext(OrdersContext);

    const navigate = useNavigate();


    const handleLogout = () => {

        localStorage.removeItem("d1tech_user");

        setAppUser(undefined);

        navigate("/login");

    }

    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/vite.svg' style={{ marginRight: '1.5em' }} />
                    D1 Tech
                </Menu.Item>
                <Menu.Item as={NavLink} to="/">Home</Menu.Item>
                <Menu.Item as={NavLink} to="/orders">Orders</Menu.Item>
                {!appUser && <Menu.Item as={NavLink} to="/login" position="right"><Icon name="sign-in" /> Login</Menu.Item>}
                {appUser && <Menu.Item as={Button} onClick={handleLogout} position="right"><Icon name="sign-out" /> Logout</Menu.Item>}
            </Container>
        </Menu>
    );
}

export default  NavBar;