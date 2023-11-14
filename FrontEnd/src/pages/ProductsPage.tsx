import {useContext, useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import {Button, Card, Checkbox, Form, Grid, Header, Icon, Input, Segment, Image, Select, Divider } from "semantic-ui-react";
import { Order } from '../types/OrderTypes';
import "../styles/OrdersPage.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import * as signalR from "@microsoft/signalr";
import {Product} from "../types/ProductTypes.ts";
import { CartContext } from '../context/CartContex.tsx';

const BASE_URL = import.meta.env.VITE_API_URL;

const BASE_SIGNALR_URL = import.meta.env.VITE_API_SIGNALR_URL;

const options = [
    { key: '1', text: 'Ascending', value: 'true' },
    { key: '2', text: 'Descending', value: 'false' }
];

const genreOptions = [
    { key: '0', text: 'Electronics', value: '0' },
    { key: '1', text: 'Clothing', value: '1' },
    { key: '2', text: 'Home-Kitchen', value: '2' },
    { key: '3', text: 'Books', value: '3' },
    { key: '4', text: 'Sports-Outdoors', value: '4' }
];

const Categories = {
    0: 'Electronics',
    1: 'Clothing',
    2: 'Home-Kitchen',
    3: 'Books',
    4: 'Sports-Outdoors',
};
function ProductsPage() {

    const navigate = useNavigate();

    const { addToCart } = useContext(CartContext);

    const [cartStatus, setCartStatus] = useState({});

    const [hubConnection, setHubConnection] = useState(null);

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [searchQuery, setSearchQuery] = useState('');

    const [products, setProducts] = useState<Product[]>([]);

    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const createHubConnection = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7109/Hubs/OrderHub')
                .configureLogging(signalR.LogLevel.Information)
                .build();

            connection.on('ProductAdded', (productId) => {
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product.id === productId ? { ...product, inCart: true } : product
                    )
                );
            });


            try {
                await connection.start();
                console.log('Connection successful!');
            } catch (err) {
                alert(err);
            }

            setHubConnection(connection);
        };

        createHubConnection();
    }, []);

    const openCheckoutModal = (orderId) => {
        setSelectedOrderId(orderId);
        setIsCheckoutModalOpen(true);
    };

    const closeCheckoutModal = () => {
        setIsCheckoutModalOpen(false);
    };

    const addToCartProduct = async (productId) => {
        try {
            toast("Product Added to Cart", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            console.log(productId);
            const response = await fetch(`https://localhost:7109/api/Product/Add`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({productId})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await fetchProductList();
            navigate("/");

            return await response.json();



        } catch (error: any) {
            console.error('An error occurred:', error.response.data);
        }
    };


    function getGenreString(categoryId) {
        return Categories[categoryId] || 'Unknown';
    }

    const fetchProductList = async () => {
        try {
            const response = await axios.get('https://localhost:7109/api/Product/Pull');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error('An error occured.', error);
        }
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7109/api/Product/Pull');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('An error occured.', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filteredBooks = products.filter(order =>
            order.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredProducts(filteredBooks);
    }, [searchQuery, products]);


    const onSelectChange = (event, data) => {
        const sortedorders = [...products].sort((a, b) => {
            if (data.value === 'true') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });

        setProducts(sortedorders);
    };

    const onSearchInputChange = (event, data) => {
        setSearchQuery(data.value);
    };

    /*const onAddButtonClick = () => {
        navigate("/books/add");
    }*/

    const returnBook = async (orderId) => {
        try {
            const response = await fetch(`https://localhost:7109/api/Books/${orderId}/return`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Assuming your API resets 'loanedOutTo' and 'dueDate' when it receives this request
                body: JSON.stringify({orderId})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Refresh the book list or update the state to reflect the returned book
            const updatedBooks = products.map(order => {
                if (order.id === orderId) {
                    return { ...order, isAvailable: true, loanedOutTo: null, dueDate: null };
                }
                return order;
            });

            setProducts(updatedBooks);
            setFilteredProducts(updatedBooks);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const onCategoryChange = (event, data) => {
        const categoryValue = data.value;
        const filteredBooksByGenre = products.filter(product => product.categories.toString() === categoryValue);
        setFilteredProducts(filteredBooksByGenre);
    };

    const resetFilter = () => {
        setFilteredProducts(products);
    };


    return (
        <>
            <Header as='h2' textAlign='center' color='blue' style={{ fontSize: '36px', fontWeight: 'bold' }}></Header>
            <Segment raised style={{backgroundColor: 'white', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', transition: '0.3s', color: '#173A3A'}}>
                <Header as='h1' textAlign='center' className="main-header">Products</Header>
                <div className="ui fitted segment d-flex justify-center" >
                    <Input className="ml-2" icon='search' placeholder="Search" value={searchQuery} onChange={onSearchInputChange} />
                    <Select className="ml-2" placeholder='Select order' options={options} onChange={onSelectChange} />
                    <Select className="ml-2" placeholder='Filter by category' options={genreOptions} onChange={onCategoryChange} />
                    <Button style={{ marginLeft: '10px', backgroundColor: '#1b8bb4', color: 'white'  }} onClick={resetFilter}>Reset Filter</Button>
                </div>
                <Divider section />
                <Grid container columns={4} padded >
                    {filteredProducts.map((product) => (
                        <Grid.Column key={product.id}>
                            <Card fluid style={{ height: '560px' }}>
                                <Image src={product.imageUrl} wrapped ui={false} alt={product.name} />
                                <Card.Content>
                                    <Card.Header>{product.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='genre'>Category: {getGenreString(product.categories)}</span>
                                    </Card.Meta>
                                    <Card.Meta>
                                        <Button style={{ backgroundColor: '#1b8bb4', color: 'white' }} onClick={() => {
                                            addToCart(product);
                                            addToCartProduct(product.id);
                                        } }>
                                            <Icon name="cart" />
                                            Add to Cart
                                        </Button>
                                        {product.inCart && <div>In someone else's shopping cart</div>}
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid>
            </Segment>
        </>
    )

}

export default ProductsPage
