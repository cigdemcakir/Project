import {Button, Card, Grid, Icon, Input} from "semantic-ui-react";
import {OrderGetAllDto} from "../types/OrderTypes.ts";

export type OrderCardProps = {
    order:OrderGetAllDto,
    index:number,
    onPasswordVisibilityToggle:(id:string) => void,
    onEditButtonClick:(id:string) => void,
    onDeleteButtonClick:(id:string) => void
};

function OrderCard({ index,order,onPasswordVisibilityToggle,onEditButtonClick,onDeleteButtonClick } : OrderCardProps) {

    return (
        <Grid.Column key={index}>
            <Card color={index % 2 === 0 ? 'blue' : 'red'} raised>
                <Card.Content header={order.title} textAlign='center' />
                <Card.Content>
                    <Input type="text" value={order.userName} textAlign='center' />
                    <Input
                        icon={{
                            name: order.showPassword ? 'eye slash outline' : 'eye',
                            link: true,
                            onClick: () => onPasswordVisibilityToggle(order.id)
                        }}
                        type={order.showPassword ? "text" : "password"}
                        value={order.password}
                        textAlign='center'
                    />
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='blue' onClick={() => onEditButtonClick(order.id)}><Icon name='edit' /> Edit</Button>
                        <Button basic color='red' onClick={() => onDeleteButtonClick(order.id)}><Icon name='delete' /> Delete</Button>
                    </div>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
}

export default OrderCard;