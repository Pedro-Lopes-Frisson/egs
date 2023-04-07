import {React, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from 'axios';

export function Login() {

    const [user_email, setUser_Email] = useState("");
    const [user_password, setUser_Password] = useState("");

    const login_user = (event) => {
        event.preventDefault();
        axios.post(
            'http://localhost:5000/api/v1/login',
            {
                username: user_email,
                password: user_password,
                provider: "parse",
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
                }

            }
        ).catch(function (error) {
            if (error.status === 400) {
                console.log("There probably is a problem with the data body");
            } else
                console.log(error.response.data)
        }).then(function (resp) {
            if (resp.status === 200) {
                localStorage.setItem("user", JSON.stringify(resp.data));
                localStorage.setItem("refresh_token", resp.data.refresh_token);
                localStorage.setItem("token", resp.data.token);
            }
            window.location = '/';
        });
    }


    return (
        <Container>
            <Form onSubmit={(event) => login_user(event)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email"
                                  onChange={(event) => setUser_Email(event.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  onChange={(event) => setUser_Password(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Keep me logged in"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
