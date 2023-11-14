import {useEffect, useState} from "react";
import { Button, Form, Input, Checkbox, Header, Segment } from "semantic-ui-react";
import api from "../utils/axiosInstance.ts";
import { OrderAddCommand } from "../types/OrderTypes.ts";
import {ApiResponse} from "../types/GenericTypes.ts";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {LocalJwt} from "../types/AuthTypes.ts";
import axios from "axios";

const BASE_SIGNALR_URL = import.meta.env.VITE_API_SIGNALR_URL;

function AddOrderPage() {

    const [userId, setUserId] = useState(null);

    const [accountHubConnection,setAccountHubConnection] = useState<HubConnection | undefined>(undefined);


    useEffect(() => {

        const startConnection = async () => {

            const jwtJson = localStorage.getItem("ecommerce_user");

            if(jwtJson){

                const localJwt:LocalJwt =JSON.parse(jwtJson);

                setUserId(localJwt.userId);

                const connection = new HubConnectionBuilder()
                    .withUrl(`${BASE_SIGNALR_URL}Hubs/AccountHub?access_token=${localJwt.accessToken}`)
                    .withAutomaticReconnect()
                    .build();

                await connection.start();

                setAccountHubConnection(connection);
            }

        }

        if(!accountHubConnection){
            startConnection();
        }


    },[])


    const [order, setOrder] = useState<OrderAddCommand>({
        title: '',
        userName: '',
        password: '',
        isFavourite: false,
        categoryIds: []
    });

    const handleSubmit = async () => {

        const accountId = await accountHubConnection?.invoke<string>("AddANewOrder",order);

        console.log(accountId)

    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://localhost:7109/api/Order/Get/${userId}`);
                setOrders(response.data);
            } catch (error) {
                console.error('An error occured.', error);
            }
        };

        fetchBooks();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Segment padded='very'>
            <Header as='h1' textAlign='center' className="main-header">Add Order</Header>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <Input placeholder='Title' name="title" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Product</label>
                    <Input placeholder='Username' name="userName" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Quantity</label>
                    <Input placeholder='Password' name="password" onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Favourite' name="isFavourite" onChange={() => setOrder({...order, isFavourite: !order.isFavourite})} />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Segment>
    );
}

export default AddOrderPage;
