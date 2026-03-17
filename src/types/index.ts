export interface Movie {
    id: number;
    name: string;
    englishName: string;
    year: number;
    rating: {
        kp: number;
    };
    poster?: {
        url: string;
        previewUrl: string;
    }
    genres: { name: string }[];
    description?: string;
}

export interface MovieResponse {
    docs: Movie[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}