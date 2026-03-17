import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.poiskkino.dev',
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.VITE_KP_API_KEY,
    },
})