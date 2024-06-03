import React, {useState} from 'react';
import {Button, Container} from 'react-bootstrap';
import CreateDish from "../components/modals/CreateDish";
import CreateRestaurant from "../components/modals/CreateRestaurant";

const Admin = () => {
    const [restaurantVisible, setRestaurnatVisible] = useState(false)
    const [dishVisible, setDishVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant="outline-dark"
                className="mt-4 p-2"
                onClick={() => setRestaurnatVisible(true)}
            >
                Создать ресторан
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDishVisible(true)}
            >
                Добавить блюдо
            </Button>

            <CreateRestaurant show={restaurantVisible} onHide={() => setRestaurnatVisible(false)}/>
            <CreateDish show={dishVisible} onHide={() => setDishVisible(false)}/>
        </Container>
    );
};

export default Admin;