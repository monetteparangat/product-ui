import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const ProductDetailsForm = ({ handlePage, productInfo }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [productTypes, setProductTypes] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: productInfo.name || "",
        price: productInfo.price || "",
        type: productInfo.type || ""
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/product/getTypes')
            .then(response => {
                setProductTypes(response.data);
                setLoading(false);
                console.log(response);
            })
            .catch(err => {
                setError('Error fetching data!');
                setLoading(false);
            });
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleBack = () => {
        handlePage('products')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setShowAlert(true);
    };

    return (
        <div>
            <Container className="container mt-5">
                {showAlert && (
                    <Alert variant="success" className="mt-3" onClose={() => setShowAlert(false)} dismissible>
                        Successfully Submitted
                    </Alert>
                )}
                <h1>Product Details Form</h1>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="text-start w-100">Product Name</Form.Label>
                                <Form.Control type="text" name='name' value={formData.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className="text-start w-100">Price</Form.Label>
                                <Form.Control type="number" name='price' value={formData.price} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="text-start w-100">Product Name</Form.Label>
                                <Form.Select aria-label="Default select example" name='type' value={formData.type} onChange={handleChange}>
                                    <option>Select a type</option>
                                    {productTypes.length > 0 ? (
                                        productTypes.map((type, index) => (
                                            <option key={index} value={type}>
                                                {type}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Loading...</option>
                                    )}
                                </Form.Select>
                            </Form.Group>

                            <Button className='m-5' variant="warning" onClick={handleBack}>
                                Back
                            </Button>
                            <Button className='m-5' variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProductDetailsForm;
