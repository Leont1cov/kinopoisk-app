import { api } from "./axiosInstance.ts";
import type { MovieResponse, Movie } from "../types/types.ts";

interface KPFilm {
    kinopoiskId: number;
    nameRu: string | null;
    nameOriginal: string | null;
    posterUrlPreview: string;
    ratingKinopoisk: number | null;
    ratingVoteCount?: number | null;
    year?: number | null;
}

interface KPResponse {
    items: KPFilm[];
    total: number;
    totalPages: number;
}

export const movieService = {
    getMovies: async (
        page: number,
        limit: number,
        filters?: Record<string, string | number | undefined>
    ): Promise<MovieResponse> => {
        const response = await api.get<KPResponse>('/films', {
            params: {
                page,
                limit,
                type: 'FILM',
                order: 'NUM_VOTE',
                votesFrom: 1000,
                ...filters,
            },
        });

        const films: Movie[] = response.data.items.map((f): Movie => ({
            id: f.kinopoiskId,
            name: f.nameRu || f.nameOriginal || 'Без названия',
            poster: { url: f.posterUrlPreview },
            rating: { kp: f.ratingKinopoisk },
            votes: { kp: f.ratingVoteCount ?? 0 },
            year: f.year ?? null,
        }));

        return {
            docs: films,
            page,
            pages: response.data.totalPages,
        };
    }
};