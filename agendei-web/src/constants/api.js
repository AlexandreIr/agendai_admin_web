import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.100.32:3020",
});

api.interceptors.request.use(config => { 
    const token = localStorage.getItem('token'); 
    if (token) config.headers['Authorization'] = `Bearer ${token}`; 
    return config; 
    }, error => { 
        return Promise.reject(error); 
    });

export default api;