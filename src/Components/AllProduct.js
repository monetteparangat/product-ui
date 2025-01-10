import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function AllProduct({ handlePage }) {
    const [products, setProducts] = useState([]);
    const [searchID, setSearchID] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, [searchID]);



    const loadData = () => {
        if (searchID) {
            axios.get(`http://localhost:8080/api/product/get/${searchID}`)
                .then(response => {
                    if (response.data) {
                        const productsData = (Array.isArray(response.data)) ? response.data : [response.data];
                        setProducts(productsData);
                        setLoading(false);
                        console.log(response, productsData.length);
                    }else{
                        setProducts([]);
                    }
                })
                .catch(err => {
                    setError('Error fetching data!');
                    setLoading(false);
                });
        } else {
            axios.get('http://localhost:8080/api/product')
                .then(response => {
                    setProducts(response.data);
                    setLoading(false);
                    console.log(response);
                })
                .catch(err => {
                    setError('Error fetching data!');
                    setLoading(false);
                });

        }
    }


    const handleEdit = (selectedProduct) => {
        handlePage('edit-product', selectedProduct);
        console.log("test selected product", selectedProduct);
    }

    const handleSearchOnChange = (e) => {
        setSearchID(e.target.value)
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Row>
                <Col>
                    <Row>
                        <h1>Product Lists</h1>
                    </Row>
                    <Row className="m-5">
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="bi bi-search"></i>
                            </InputGroup.Text>
                            <Form.Control type="number" placeholder="Search ID" value={searchID} onChange={handleSearchOnChange} />
                        </InputGroup>
                    </Row>
                    <Card className="p-5">
                        {!loading && products && products.length > 0 && (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td style={{ width: '100px' }}>
                                                <Button variant="primary" onClick={() => handleEdit(product)}>
                                                    <i className="bi bi-pencil-square"></i> Edit
                                                </Button>
                                            </td>
                                            <td style={{ width: '150px' }}>
                                                <Button variant="danger">
                                                    <i className="bi bi-trash"></i> Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default AllProduct;