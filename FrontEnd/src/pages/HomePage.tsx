import {useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import {Button, Card, Checkbox, Form, Grid, Header, Icon, Input, Segment, Select} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const onAddButtonClick = () => {
        navigate("/orders/add");
    }

    return (
        <>

            <Segment raised style={{backgroundColor: 'white', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)', marginTop: '4em', transition: '0.3s', color: '#173A3A'}}>
                <Header as='h1' textAlign='center' className="main-header">Create Order</Header>
                <div className="ui fitted segment d-flex justify-center">
                    <Button color='green' onClick={onAddButtonClick}><Icon name='add circle' /> Add</Button>
                </div>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column textAlign='center'>
                            <Header as='h4'></Header>
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>



        </>
    )

}

export default HomePage
