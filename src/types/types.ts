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