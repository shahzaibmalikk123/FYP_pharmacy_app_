import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://medxcure-server.herokuapp.com/",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;