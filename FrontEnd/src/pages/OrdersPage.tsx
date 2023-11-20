import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, Grid, Header, Table} from 'semantic-ui-react';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7109/api/Order/Get');
                setOrders(response.data);
                console.log(response);
            } catch (error) {
                console.error('An error occurred while fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Istanbul' };
        return new Date(dateString).toLocaleString('tr-TR', options);
    };

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
                    {orders.map((order) => (
                        <Table.Row key={order.id}>
                            <Table.Cell>{order.userId}</Table.Cell>
                            <Table.Cell>{formatDate(order.orderDate)}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};



export default OrdersPage;
