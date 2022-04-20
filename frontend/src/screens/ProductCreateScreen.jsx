import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {
    listProducts,
    listProductDetails,
    createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductCreateScreen() {
    // const productId = match.params.id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo.data.isAdmin) {
            navigate("/login");
        }
        if (successCreate) {
            navigate(`/admin/productlist`);
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, navigate, userInfo, successCreate, createdProduct]);

    const submitHandler = async (e) => {
        e.preventDefault();
        // const file = e.target.files[0];
        const formData = new FormData();
        // formData.append("image", file);
        formData.append("name", name);
        formData.append("price", price);
        // formData.append("image", image);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("description", description);

        console.log("You hit the create button!");
        dispatch(createProduct(formData));
    };

    const uploadFileHandler = async (e) => {
        // const file = e.target.files[0];
        // const formData = new FormData();
        // formData.append("image", file);
        // formData.append("product_id", productId);
        // setUploading(true);
        // console.log(formData);
        // try {
        //     const config = {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     };
        //     const { data } = await axios.post(
        //         "/api/products/upload/",
        //         formData,
        //         config
        //     );
        //     setImage(data);
        //     setUploading(false);
        // } catch (error) {
        //     setUploading(false);
        // }
    };

    return (
        <div>
            <Link to="/admin/productlist">Go Back</Link>

            <FormContainer>
                <h1>Create Product</h1>
                {loadingCreate && <Loader />}
                {errorCreate && (
                    <Message variant="danger">{errorCreate}</Message>
                )}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Enter image"
                                value={image}
                                onChange={(e) => setImage(e.target.files)}
                            ></Form.Control>

                            {/* <Form.File
                                id="image-file"
                                label="Choose File"
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />} */}
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countinstock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter stock"
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Create
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    );
}

export default ProductCreateScreen;
