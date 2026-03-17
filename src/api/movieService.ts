import { api } from "./axiosInstance.ts";
import type { MovieResponse } from "../types";

export const movieService = {
    getMovies: async (page = 1, limit = 10) => {
        const data = await api.get<MovieResponse>('/movie', {
            params: {
                page,
                limit,
                'rating.kp': '7-10',
                'poster.url': '!null',
            },
        });
        return data
    }
}