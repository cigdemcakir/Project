import {useContext, useEffect, useState} from "react";
import {Button, Divider, Grid, Header, Icon, Input, Segment, Select} from "semantic-ui-react";
import "../styles/OrdersPage.css";
import AccountCard from "../components/OrderCard.tsx";
import {OrdersContext} from "../context/StateContext.tsx";
import api from "../utils/axiosInstance.ts";
import { PaginatedList} from "../types/GenericTypes.ts";
import {OrderGetAllDto} from "../types/OrderTypes.ts";
import {useNavigate} from "react-router-dom";


const options = [
    { key: '1', text: 'Ascending', value: 'true' },
    { key: '2', text: 'Descending', value: 'false' }
];


function OrdersPage( ) {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const { orders, setOrders } = useContext(OrdersContext);

    useEffect(() => {
        const fetchAccounts = async () => {

            const response = await api.get<PaginatedList<OrderGetAllDto>>("/Orders");

            setOrders(response.data.items);
        }

        fetchAccounts();

        return;

    },[])



    const onSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const getFilteredOrders = () => {
        if (!searchTerm) return orders;

        return orders.filter((order) =>
            order.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const onPasswordVisibilityToggle = (id:string) => {

        const updatedAccounts = orders.map(order => {
            if (order.id === id) {

                return {...order, ShowPassword: !order.showPassword};
            } else {
                return order;
            }
        });

        setOrders(updatedAccounts);
    }


    const onAddButtonClick = () => {
        navigate("/");
    }

    const onSelectChange = (event, data) => {
        const sortedBooks = [...orders].sort((a, b) => {
            if (data.value === 'true') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

        setOrders(sortedBooks);
    };

    const onEditButtonClick = (id: string) => {
        console.log(`Edit button clicked for id: ${id}`);


    }

    const onDeleteButtonClick = (id: string) => {
        console.log(`Delete button clicked for id: ${id}`);

        const updatedOrders = orders.filter(order => order.id !== id);

        setOrders(updatedOrders);
    }

    return (
        <Segment padded='very'>
            <Header as='h1' textAlign='center' className="main-header">My Orders</Header>
            <div className="ui fitted segment d-flex justify-center">
                <Button color='green' onClick={onAddButtonClick}><Icon name='add circle' /> Add</Button>
                <Input className="ml-2" icon='search' value={searchTerm} placeholder="Search" onChange={onSearchInputChange} />
                <Select className="ml-2" placeholder='Select order' options={options} onChange={onSelectChange} />
            </div>
            <Divider section />
            <Grid columns={3} stackable>
                {orders.map((account, index) =>(
                    <AccountCard key={index} order={account} index={index} onPasswordVisibilityToggle={onPasswordVisibilityToggle}
                                 onEditButtonClick={onEditButtonClick} onDeleteButtonClick={onDeleteButtonClick} />
                ))}
            </Grid>
        </Segment>
    );
}

export default OrdersPage;