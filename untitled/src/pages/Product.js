import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Form, Container, Badge, Row, Col, Modal} from "react-bootstrap";
import axios from "axios";

export function Product() {
    const {id} = useParams();
    const [newLink, setNewLink] = useState("");
    const [product, setProduct] = useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleNewLink = (event) => {
        setNewLink(event.currentTarget.value);
    }

    const handleAddLink = (event) => {
        product.photos.push(newLink);
        setShow(false);
        event.preventDefault();
    }


    useEffect(() => {
        console.log("ola")
        axios.get(`http://localhost:8000/products/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(function (resp) {
            if (404 === resp)
                console.log("Not Found");
            if (resp.status === 200){
                setProduct(resp.data)
                console.table(resp.data)
                console.table(product)
            }

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
    }, [id])

    return (
        <>
            <Container fluid className={"justify-content-center"}>
                <Form className={"justify-content-center"}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={product.id} disabled/>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={product.name}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={product.price}/>
                    </Form.Group>

                    <Container>
                        <Row xl={6} sm={2} lg={6} className={"g-4"}>
                            {product.photos && product.photos.map((photo, idx) => (
                                <Col lg={1} sm={5} md={3} className={"p-2 m-1 overflow-hidden"}>
                                    <Badge bg="light" text="dark" key={idx}>
                                        {photo}
                                    </Badge>
                                </Col>
                            ))
                            }
                        </Row>
                        <Button onClick={handleShow} variant="primary">
                            Add
                        </Button>
                    </Container>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Photos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddLink}>
                        <Form.Group className={"mb-3"}>
                            <Form.Control type="text" onChange={handleNewLink} placeholder="http://example.com"/>
                        </Form.Group>
                        <Button type={"submit"}>Add</Button>
                    </Form>

                </Modal.Body>
            </Modal>
        </>
    );

}