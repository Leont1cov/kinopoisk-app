export interface Movie {
    id: number;
    name: string;
    poster: { url: string };
    rating: { kp: number | null };
    votes: { kp: number };
    year: number | null; // добавлено
}

export interface MovieResponse {
    docs: Movie[];
    page: number;
    pages: number;
}

// То, что прилетает из сети (Unofficial API)
export interface KPFilm {
    kinopoiskId: number;
    nameRu: string | null;
    nameOriginal: string | null;
    posterUrlPreview: string;
    ratingKinopoisk: number | null;
    year: number | null;
}

export interface KPResponse {
    items: KPFilm[];
    totalPages: number;
}
