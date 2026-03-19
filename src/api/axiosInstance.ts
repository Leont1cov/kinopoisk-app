import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.VITE_KP_API_KEY,
    },
});