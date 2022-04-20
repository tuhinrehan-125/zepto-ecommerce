import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { listProducts } from "../actions/productActions";

// import products from "../products";
// import axios from "axios";

function HomeScreen() {
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const productList = useSelector((state) => state.productList);
    const { error, loading, products } = productList;

    let keyword = location.search;

    useEffect(() => {
        // async function fetchProducts() {
        //     const { data } = await axios.get("/products");
        //     setProducts(data);
        // }
        // fetchProducts();

        dispatch(listProducts(keyword));
    }, [dispatch, keyword]);

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products?.map((product) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}

export default HomeScreen;
