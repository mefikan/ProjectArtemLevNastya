import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createRestaurant} from "../../http/restaurantAPI";
const CreateRestaurant = observer(({show, onHide}) => {
    const {restaurant} = useContext(Context)
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [file, setFile] = useState(null)
    const [properties, setProperties] = useState('')


    const selectFile = e =>{
        setFile(e.target.files[0])
    }
    const addRestaurant = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('rating', rating)
        formData.append('properties', properties)
        formData.append('img', file)
        await createRestaurant(formData).then(data => onHide())
    }

    return(
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
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название ресторана"
                    />
                    <Form.Control
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                        className="mt-3"
                        placeholder="Введите рейтинг ресторана"
                        type="number"
                    />
                    <Form.Control
                        value={properties}
                        onChange={e => setProperties(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание ресторана"
                    />
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
                <Button variant="outline-success" onClick={addRestaurant}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )

})

export default CreateRestaurant