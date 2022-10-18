import axios from "axios";
import {useStorage} from "@vueuse/core";

export const isAuth = () => {
    return useStorage('justToken', '', localStorage).value?.length > 0;
}


let fetcher = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

fetcher.interceptors.request.use(
    config => {
        const token = localStorage.getItem('justToken');

        if (token) {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete fetcher.defaults.headers.common.Authorization;
        }
        return config;
    },

    error => Promise.reject(error.response.data.error)
);

export default fetcher;






