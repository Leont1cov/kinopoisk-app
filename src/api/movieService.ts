import { api } from "./axiosInstance.ts";
import type { MovieResponse } from "../types";

export const movieService = {
    getMovies: async (page = 1, limit = 50) => {
        const response = await api.get<MovieResponse>('/movie', {
            params: {
                page,
                limit,
                'name': '!null',
                'rating.kp': '7-10',
                'poster.url': '!null',
                'votes.kp': '1000-1000000',
                'sortField': 'votes.kp',
                'sortType': '-1',
            },
        });
        return response.data;
    }
}