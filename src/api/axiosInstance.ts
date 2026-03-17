import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.poiskkino.dev/v1.4',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.VITE_KP_API_KEY,
    },
})