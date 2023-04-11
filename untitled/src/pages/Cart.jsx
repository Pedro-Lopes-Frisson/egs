import {React, useState, useEffect} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {faPlus, faMinus, faTrash} from "@fortawesome/free-solid-svg-icons";

export function Cart() {
    library.add(fab, faCheckSquare, faCoffee, faPlus, faMinus, faTrash)
    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            console.log(JSON.parse(localStorage.getItem("cart")));
            setProducts(JSON.parse(localStorage.getItem("cart") ?? '[]'));
        }
        , []);
    const removeItem = (event) => {
        event.preventDefault();

        const _div = event.target.closest("div");
        const id = _div.dataset["mkId"];

        const new_list = JSON.parse(localStorage.getItem("cart")).filter((prod) => prod.id !== id);
        setProducts(new_list);
        localStorage.setItem("cart", JSON.stringify(new_list));

        console.log(`Id : ${id}`)
        window.dispatchEvent(new Event("storage"));
    };

    const changeQuantity = (event) => {
        const _div = event.target.closest("div");
        const id = _div.dataset["mkId"];
        const qty = _div.dataset["mkQuantity"] * 1;

        const new_list = JSON.parse(localStorage.getItem("cart"));
        new_list.map((prod, idx) => {
            if (prod.id === id) {
                prod.quantity = prod.quantity + qty < 0 ? 0 : prod.quantity + qty;
            }
        });
        setProducts(new_list);
        localStorage.setItem("cart", JSON.stringify(new_list));
    };
    return (
        <Container className={"justify-content-center mt-5"}>
            {products.length > 0 &&
                products.map((prod, idx) => (
                    <Row
                        className={"mt-1 border border-1 border-light justify-content-center bg-light align-items-center"}>
                        <Col className={"text-center"}>
                            {prod.name}
                        </Col>
                        <Col lg={3} md={4} sm={6} className={"text-center"}>
                            <Container>
                                <Row className={"justify-content-center text-center align-items-center"}>
                                    <Col lg={1} sm={1} md={1}>{prod.quantity}</Col>
                                    <Col lg={1} sm={1} md={1} className={"align-items-center text-center"}>
                                        <Container>
                                            <Row className={"justify-content-center align-items-center "}>
                                                <Col data-mk-id={prod.id} data-mk-quantity={"1"}
                                                     onClick={changeQuantity}>
                                                    <FontAwesomeIcon
                                                        icon={["fas", "fa-plus"]}/>
                                                </Col>
                                            </Row>
                                            <Row className={"justify-content-center align-items-center "}>
                                                <Col className={"m-auto"} data-mk-id={prod.id} data-mk-quantity={"-1"}
                                                     onClick={changeQuantity}>
                                                    <FontAwesomeIcon
                                                        icon={["fas", "fa-minus"]}/>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>

                        <Col id={prod.id} data-mk-id={prod.id} onClick={removeItem} lg={1} sm={1} md={1}
                             className="text-center"><FontAwesomeIcon
                            className={"text-danger"} size={"2x"}
                            icon={["fas", "fa-trash"]}/></Col>
                    </Row>
                ))
                ||
                <Row className={"text-center justify-content-center mt-3 fs-3"}>There are no items in the cart go back
                    Shopping!</Row>
            }
        </Container>
    )

}

