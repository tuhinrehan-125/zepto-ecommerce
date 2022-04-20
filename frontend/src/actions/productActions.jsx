import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    SPECIFIC_PRODUCT_REQUEST,
    SPECIFIC_PRODUCT_SUCCESS,
    SPECIFIC_PRODUCT_FAIL,
    SPECIFIC_PRODUCT_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants";

import Api from "../axios";

export const listProducts =
    (keyword = "") =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_LIST_REQUEST });

            const { data } = await axios.get(`/products${keyword}`);

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${userInfo.token}`,
        //     },
        // };

        // const { data } = await axios.delete(
        //     `/admin/product-destroy/${id}/`,
        //     config
        // );

        const { data } = await Api.delete(`/admin/product-destroy/${id}/`);

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProduct = (formData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        // const config = {
        //     headers: {
        //         "Content-type": "application/json",
        //         Authorization: `Bearer ${userInfo.meta.token}`,
        //     },
        // };

        const { data } = await Api.post(`/admin/product-store/`, formData);
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const specificProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SPECIFIC_PRODUCT_REQUEST });

        const { data } = await axios.get(`/admin/product-show/${id}`);

        dispatch({
            type: SPECIFIC_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SPECIFIC_PRODUCT_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.meta.token}`,
            },
        };

        const { data } = await axios.put(
            `/admin/product-update/${product.id}/`,
            product,
            config
        );
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        });

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
