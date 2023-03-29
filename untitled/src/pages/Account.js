import {Badge, Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import axios from "axios";

export function  Account () {

    useEffect(()=>{
        axios.get(`https://localhost:8000/entities/`)
    },)


    return (
            <Container fluid className={"justify-content-center p-3"}>
                <Row className={"justify-content-center"}>
                    Pedro Lopes
                </Row>
                <Form className={"justify-content-center"}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={"ola"} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" value={"ola"} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Container>
    );

}