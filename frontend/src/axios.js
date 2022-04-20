import axios from "axios";
import store from "./store";

const {
    userLogin: { userInfo },
} = store.getState();

const Api = axios.create({
    baseURL: "http://localhost:8000/api",
});

Api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${userInfo.meta.token}`;
    return config;
});

export default Api;
