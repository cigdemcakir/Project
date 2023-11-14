import React, { useContext } from 'react';
import { CartContext } from '../context/CartContex.tsx';
import {Button, Container, Divider, Grid, Header, Icon, List, Segment} from "semantic-ui-react";
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

    const navigate = useNavigate();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
        } else {
            removeFromCart(productId);
        }
    };

    const createOrder = async () => {
        try {
            const userId = uuidv4();

            const productIds = cartItems.map(item => item.id);

            const orderDate = new Date().toISOString();

            const orderDetails = {
                userId,
                orderDate,
                productIds
            };

            const response = await fetch(`https://localhost:7109/api/Order/Add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Order created successfully');

            toast("Order Created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/');

        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    return (
        <Container text style={{ marginTop: '3em', height: '1200px', overflow: 'auto' }}>
            <Segment piled>
                <Header as='h1' textAlign='center' style={{ marginBottom: '1em' }} className="main-header">
                    Cart
                </Header>
                {cartItems.map((item, index) => (
                    <Segment key={index}>
                        <Grid>
                            <Grid.Column width={12}>
                                <span>{item.name}</span>
                            </Grid.Column>
                            <Grid.Column width={4} textAlign='right'>
                                <Button icon='minus' onClick={() => handleQuantityChange(item.id, item.quantity - 1)} />
                                {item.quantity}
                                <Button icon='plus' onClick={() => handleQuantityChange(item.id, item.quantity + 1)} />
                                <Button icon='delete' onClick={() => removeFromCart(item.id)} />
                            </Grid.Column>
                        </Grid>
                    </Segment>
                ))}
                <div style={{ textAlign: 'right', marginTop: '1em' }}>
                    <Button primary onClick={createOrder}>
                        Create Order
                    </Button>
                </div>
            </Segment>
        </Container>



    );
};

export default CartPage;
