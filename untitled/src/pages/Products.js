import Container from "react-bootstrap/Container";
import {Button, Card, CardGroup, Col, Form, Row} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

export function Products() {
    /*const produtos = {
      "searchQuery": "",
      "page": 0,
      "offset": 0,
      "count": 20,
      "products": [
        {
          "id": "624debe5-036c-4560-b82c-a0670bf12b3e",
          "name": "Name of The product 1",
          "price": 2.1,
          "photos": [
            "https://imgs.search.brave.com/U7BX1Y7QIqPX4K7Bptng2QuSwuoBlOrQGAqo5rXuVV8/rs:fit:1200:1066:1/g:ce/aHR0cHM6Ly80LmJw/LmJsb2dzcG90LmNv/bS8ta3hOWGVTQkRl/QkUvV0t4VGVFX1R5/WkkvQUFBQUFBQUF1/ekEvTUh2NldLVlR3/ODBmRmV6OUplRmdN/Z3lHclBJMWkwQlNn/Q0xjQi9zMTYwMC9m/b29kaWVzZmVlZC5j/b21fb3Jhbmdlcy5q/cGc"
          ],
          "manufacturer": {
            "name": "ACME Corporation",
            "homePage": "https://www.acme-corp.com",
            "phone": "408-867-5309"
          }
        },
        {
          "id": "624debe5-036c-4560-b82c-a0670bf12b3e",
          "name": "Name of The product 2",
          "price": 2.1,
          "photos": [
            "https://imgs.search.brave.com/U7BX1Y7QIqPX4K7Bptng2QuSwuoBlOrQGAqo5rXuVV8/rs:fit:1200:1066:1/g:ce/aHR0cHM6Ly80LmJw/LmJsb2dzcG90LmNv/bS8ta3hOWGVTQkRl/QkUvV0t4VGVFX1R5/WkkvQUFBQUFBQUF1/ekEvTUh2NldLVlR3/ODBmRmV6OUplRmdN/Z3lHclBJMWkwQlNn/Q0xjQi9zMTYwMC9m/b29kaWVzZmVlZC5j/b21fb3Jhbmdlcy5q/cGc"
          ],
          "manufacturer": {
            "name": "ACME Corporation",
            "homePage": "https://www.acme-corp.com",
            "phone": "408-867-5309"
          }
        },
        {
          "id": "624debe5-036c-4560-b82c-a0670bf12b3e",
          "name": "Name of The product 3",
          "price": 2.1,
          "photos": [
            "https://imgs.search.brave.com/U7BX1Y7QIqPX4K7Bptng2QuSwuoBlOrQGAqo5rXuVV8/rs:fit:1200:1066:1/g:ce/aHR0cHM6Ly80LmJw/LmJsb2dzcG90LmNv/bS8ta3hOWGVTQkRl/QkUvV0t4VGVFX1R5/WkkvQUFBQUFBQUF1/ekEvTUh2NldLVlR3/ODBmRmV6OUplRmdN/Z3lHclBJMWkwQlNn/Q0xjQi9zMTYwMC9m/b29kaWVzZmVlZC5j/b21fb3Jhbmdlcy5q/cGc"
          ],
          "manufacturer": {
            "name": "ACME Corporation",
            "homePage": "https://www.acme-corp.com",
            "phone": "408-867-5309"
          }
        },
        {
          "id": "624debe5-036c-4560-b82c-a0670bf12b3e",
          "name": "Name of The product 4",
          "price": 2.1,
          "photos": [
            "https://imgs.search.brave.com/U7BX1Y7QIqPX4K7Bptng2QuSwuoBlOrQGAqo5rXuVV8/rs:fit:1200:1066:1/g:ce/aHR0cHM6Ly80LmJw/LmJsb2dzcG90LmNv/bS8ta3hOWGVTQkRl/QkUvV0t4VGVFX1R5/WkkvQUFBQUFBQUF1/ekEvTUh2NldLVlR3/ODBmRmV6OUplRmdN/Z3lHclBJMWkwQlNn/Q0xjQi9zMTYwMC9m/b29kaWVzZmVlZC5j/b21fb3Jhbmdlcy5q/cGc"
          ],
          "manufacturer": {
            "name": "ACME Corporation",
            "homePage": "https://www.acme-corp.com",
            "phone": "408-867-5309"
          }
        },
        {
          "id": "624debe5-036c-4560-b82c-a0670bf12b3e",
          "name": "Name of The product",
          "price": 2.1,
          "photos": [
            "https://imgs.search.brave.com/U7BX1Y7QIqPX4K7Bptng2QuSwuoBlOrQGAqo5rXuVV8/rs:fit:1200:1066:1/g:ce/aHR0cHM6Ly80LmJw/LmJsb2dzcG90LmNv/bS8ta3hOWGVTQkRl/QkUvV0t4VGVFX1R5/WkkvQUFBQUFBQUF1/ekEvTUh2NldLVlR3/ODBmRmV6OUplRmdN/Z3lHclBJMWkwQlNn/Q0xjQi9zMTYwMC9m/b29kaWVzZmVlZC5j/b21fb3Jhbmdlcy5q/cGc"
          ],
          "manufacturer": {
            "name": "ACME Corporation",
            "homePage": "https://www.acme-corp.com",
            "phone": "408-867-5309"
          }
        }
      ]
    }
    */

    const [searchQuery, setSearchQuery] = useState("");
    const [offset, setOffset] = useState("");
    const [page, setPage] = useState("");
    const [searchLimit, setSearchLimit] = useState(10);
    const [searchProducts, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const instance = axios.create({
        // set other configuration options as needed
        headers: {
            // remove the Host header
            // note: you may need to also remove other default headers depending on your use case
            common: {
                ...axios.defaults.headers.common,
            }
        }
    });

    useEffect(() => {
        console.log("ola")
        axios.get("http://localhost:8000/products/products", {
            params: {
                'searchQuery': searchQuery,
                'limit': searchLimit,
                'page': page,
                'offset': offset
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        }).then(function (resp) {
            console.log(resp);
            if (resp.status === 200) {
                setProducts(resp.data.products);
                setPagination(resp.data.pagination)
            }
        })
    }, [])

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        //setSearchQuery(event.currentTarget.)
        axios.get("http://localhost:8000/products/products", {
            params: {
                'searchName': searchQuery,
                'limit': searchLimit,
                'page': page,
                'offset': offset
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        }).then(function (resp) {
            console.log(resp);
            if (resp.status === 200) {
                setProducts(resp.data.products);
                setPagination(resp.data.pagination)
            }
        })
        event.preventDefault();
    };

    const handleSelect = (e) => {
        console.log(e.currentTarget.value);
        setSearchLimit(e.target.value);

    }

    const updateSearchQuery = (event) => {
        console.log(event.target.value);
        setSearchQuery(event.target.value);
    }

    return (
        <Container fluid as={"div"} className="vh-100 mt-5">
            <Row className="h-100">
                <Col className="d-none d-lg-block d-md-block d-xl-block text-center" md={3} lg={3}>
                    Filtros Go here
                </Col>
                <Col className={"text-center overflow-scroll"} md={9} lg={9}>
                    <Container fluid className={"w-100"}>

                        <Form noValidate validated={validated} onSubmit={handleSubmit} className={"mb-3"}>
                            <Form.Group className="mb-3" controlId="SearchForm">
                                <Form.Control type="text" onChange={updateSearchQuery} placeholder="Search"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId={"searchlimit"}>
                                <Form.Select aria-label="Display Items" defaultChecked={searchLimit}
                                             onChange={handleSelect}>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </Form.Select>
                            </Form.Group>

                            <Button className="mb-3" type="submit">Submit</Button>
                        </Form>

                        <Row xs={1} md={2} lg={4} className="g-4">
                            {searchProducts.length > 0 && searchProducts.map((p, idx) => (
                                <Col>
                                    <LinkContainer to={`/Products/${p.id}`}>
                                        <Card>
                                            <Card.Img variant="top" src={p.photos[0]}/>
                                            <Card.Body>
                                                <Card.Title>{p.name}</Card.Title>
                                                <Card.Text>
                                                    {(p.price * (idx + 1) + "").substring(0, 4)} $
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </LinkContainer>
                                </Col>
                            )) || <Container> There are no Products to show!</Container>}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>

    );
}