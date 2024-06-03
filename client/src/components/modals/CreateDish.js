import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createDish, createDishWithProps} from "../../http/dishAPI";
import {getAllRestaurants} from "../../http/restaurantAPI";
import {inlineDrinkArr, inlineFoodArr} from "../../utils/consts";
const CreateDish = observer(({show, onHide}) => {
    const {dish} = useContext(Context)
    const [dishName, setDishName] = useState('')
    const [dishSize, setDishSize] = useState('')
    const [dishTag, setDishTag] = useState('')
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')
    const [dishPrice, setDishPrice] = useState('')
    const [dishRating, setDishRating] = useState('')
    const [RestaurantIdRestaurant, setRestaurantIdRestaurant] = useState('')
    const [p1, setp1] = useState('')
    const [p2, setp2] = useState('')
    const [p3, setp3] = useState('')
    const [p4, setp4] = useState('')
    const [p5, setp5] = useState('')

    //ratesNumber=0

    useEffect(() => {
        getAllRestaurants().then(data => dish.setRestaurants(data))
    }, [])
    useEffect(() => {
        if (dishTag) {
            if (dishTag === 'Еда') {
                dish.setProperties(inlineFoodArr.sort())
            }
            else
                dish.setProperties(inlineDrinkArr.sort())
        }
    }, [dishTag, dish])
    const selectFile = e =>{
        setFile(e.target.files[0])
    }
    const addDish = async () => {
        const formData = new FormData()
        formData.append('dishName', dishName)
        formData.append('dishSize', dishSize)
        formData.append('dishTag', dishTag)
        formData.append('description', description)
        formData.append('dishPrice', dishPrice)
        formData.append('dishRating', dishRating)
        formData.append('RestaurantIdRestaurant', dish.RestaurantId)
        formData.append('img', file)
        formData.append('p1', p1)
        formData.append('p2', p2)
        formData.append('p3', p3)
        formData.append('p4', p4)
        formData.append('p5', p5)

        console.log(dish.RestaurantId)
        await createDishWithProps(formData)

        onHide()
    }
    return (
        <Modal
            show = {show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Ресторан
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={dishName}
                        onChange={e => setDishName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название блюда"
                    />
                    <Form.Control
                        value={dishSize}
                        onChange={e => setDishSize(e.target.value)}
                        className="mt-3"
                        placeholder="Введите вес блюда (г)"
                        type="number"
                    />
                    <Form.Control
                        value={dishTag}
                        onChange={e => setDishTag(e.target.value)}
                        className="mt-3"
                        placeholder="Введите тег блюда (Еда, Напитки)"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание блюда"
                    />
                    <Form.Control
                        value={dishPrice}
                        onChange={e => setDishPrice(e.target.value)}
                        className="mt-3"
                        placeholder="Введите цену блюда"
                        type="number"
                    />
                    <Form.Control
                        value={dishRating}
                        onChange={e => setDishRating(e.target.value)}
                        className="mt-3"
                        placeholder="Введите рейтинг блюда"
                        type="number"
                    />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите ресторан"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dish.Restaurants.map(restaurant =>

                                <Dropdown.Item
                                    onClick={() => dish.setRestaurantId(restaurant.idRestaurant)}
                                    key={restaurant.idRestaurant}
                                >
                                    {restaurant.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите свойство 1"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dish.Properties.map(prop =>
                                <Dropdown.Item
                                    onClick={() => setp1(prop)}
                                    key={prop}
                                >
                                    {prop}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите свойство 2"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                        {dish.Properties.map(prop =>
                            <Dropdown.Item
                                onClick={() => setp2(prop)}
                                key={prop}
                            >
                                {prop}
                            </Dropdown.Item>
                        )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите свойство 3"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dish.Properties.map(prop =>
                                <Dropdown.Item
                                    onClick={() => setp3(prop)}
                                    key={prop}
                                >
                                    {prop}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите свойство 4"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dish.Properties.map(prop =>
                                <Dropdown.Item
                                    onClick={() => setp4(prop)}
                                    key={prop}
                                >
                                    {prop}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{"Выберите свойство 5"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dish.Properties.map(prop =>
                                <Dropdown.Item
                                    onClick={() => setp5(prop)}
                                    key={prop}
                                >
                                    {prop}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDish}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
});

export default CreateDish