import axios from "axios";
import { history } from './navigate';

const apiKey = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
    baseURL: apiKey,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {

            localStorage.removeItem('accessToken');
            history.push('/');
        }

        return Promise.reject(error);
    }
);

export default apiClient;