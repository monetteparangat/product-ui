import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDetailsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        type: '',
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/products.json/1')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was an error fetching the data!', error);
                setLoading(false);
            });
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="container mt-5">
            <h1>Product Details Form</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Product Type</label>
                    <select
                        id="type"
                        name="type"
                        className="form-control"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="">Select a type</option>
                        <option value="Home Appliance">Home Appliance</option>
                        <option value="Electronics">Electronics</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductDetailsForm;
