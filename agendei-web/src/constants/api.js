import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.32:3020",
});


export default api;