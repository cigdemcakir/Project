import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, Grid, Header, Table} from 'semantic-ui-react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        setOrderDetails([
            { id: 'F5D2D884-EDB5-4E5C-A69B-142F888B54C2', orderDate: '2023-11-14 09:38:33.240 +0300' }
        ]);
    }, []);

    /*useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7109/api/Order/Get');
                setOrders(response.data);
            } catch (error) {
                console.error('An error occurred while fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);*/


    return (
        <div>
            <Header as='h2' textAlign='center' style={{color:'white'}}>Orders</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Order ID</Table.HeaderCell>
                        <Table.HeaderCell>Order Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                        <Table.Row>
                            <Table.Cell>F5D2D884-EDB5-4E5C-A69B-142F888B54C2</Table.Cell>
                            <Table.Cell>2023-11-14 09:38:33.240</Table.Cell>
                        </Table.Row>

                </Table.Body>
            </Table>
        </div>
    );
};



export default OrdersPage;
