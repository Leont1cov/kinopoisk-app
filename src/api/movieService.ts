import { api } from "./axiosInstance";
import type { Movie, MovieResponse, KPResponse } from "../types/types.ts";
import { GENRE_MAP } from "../constans/genres.ts";

export const movieService = {
    getMovies: async (page: number, filters: Record<string, string>): Promise<MovieResponse> => {
        // Создаем объект параметров с явным указанием типов
        const params: Record<string, string | number | undefined> = {
            page,
            keyword: filters['keyword'],
            order: 'NUM_VOTE',
            type: 'FILM'
        };

        // 1. Обработка Рейтинга (Парсим "7-10")
        const ratingStr = filters['rating.kp'];
        if (ratingStr?.includes('-')) {
            const [from, to] = ratingStr.split('-');
            const rFrom = parseFloat(from);
            const rTo = parseFloat(to);
            if (!isNaN(rFrom)) params.ratingFrom = rFrom;
            if (!isNaN(rTo)) params.ratingTo = rTo;
        }

        // 2. Обработка Года (Парсим "1990-2025")
        const yearStr = filters['year'];
        if (yearStr?.includes('-')) {
            const [from, to] = yearStr.split('-');
            const yFrom = parseInt(from, 10);
            const yTo = parseInt(to, 10);
            if (!isNaN(yFrom) && yFrom >= 1888) params.yearFrom = yFrom;
            if (!isNaN(yTo) && yTo <= 2026) params.yearTo = yTo;
        }

        // 3. Обработка Жанра (Маппинг текста в ID)
        const genreName = filters['genres.name'];
        if (genreName && GENRE_MAP[genreName]) {
            params.genres = GENRE_MAP[genreName];
        }

        // Выполняем запрос с указанием интерфейса ответа
        const response = await api.get<KPResponse>('/films', { params });

        const films: Movie[] = response.data.items.map((f): Movie => ({
            id: f.kinopoiskId,
            name: f.nameRu || f.nameOriginal || 'Без названия',
            poster: { url: f.posterUrlPreview },
            rating: { kp: f.ratingKinopoisk },
            year: f.year,
            votes: { kp: 0 }
        }));

        return {
            docs: films,
            page,
            pages: response.data.totalPages
        };
    },
    getMovieById: async (id: string) => {
        const response = await api.get(`/films/${id}`);
        return response.data;
    }
};
