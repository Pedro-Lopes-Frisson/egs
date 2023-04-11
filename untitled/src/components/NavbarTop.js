import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import {AuthService} from '../services/authservice'
import {Badge} from "react-bootstrap";
import {useEffect, useState} from "react";

export function NavBarTop() {
    const perform_logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location = "/"
    }
    const hasUser = () => {
        return localStorage.getItem("token") != null;
    }

    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        // This function will be called whenever the component mounts or
        // when a value in the dependency array (second argument) changes.
        const itemsInCart = JSON.parse(localStorage.getItem('cart') ?? '[]').length;
        setCartItems(itemsInCart);
        const handleLoginStatusChange = (event) => {
            console.log(event);
            const itemsInCart = JSON.parse(localStorage.getItem('cart') ?? '[]').length;
            setCartItems(itemsInCart);
        };

        // Add an event listener that calls the above function whenever
        // the 'storage' event is triggered.
        window.addEventListener('storage', handleLoginStatusChange);

        // Clean up the event listener when the component unmounts.
        return () => {
            window.removeEventListener('storage', handleLoginStatusChange);
        };
    }, [])

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Mar Ket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/Products">
                            <Nav.Link>Products</Nav.Link>
                        </LinkContainer>
                        {!hasUser() &&
                            <Container className={"d-inline-flex justify-content-end"}>
                                <LinkContainer to="/Login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                            </Container>
                        }
                        {hasUser() &&
                            <Container className={"d-inline-flex justify-content-end"}>
                                <LinkContainer to="/Account">
                                    <Nav.Link><i className={"bi bi-person-square"}/>Pedro Lopes</Nav.Link>
                                </LinkContainer>
                                <Nav.Link onClick={perform_logout}><i className={"bi bi-person-square"}/>Terminar
                                    Sessão</Nav.Link>

                                <LinkContainer to="/Cart">
                                    <Nav.Link><i className={"bi bi-bag"}/><Badge
                                        bg="secondary">{cartItems}</Badge></Nav.Link>
                                </LinkContainer>
                            </Container>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}