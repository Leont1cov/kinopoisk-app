import { useState, useEffect } from 'react';
import { movieService } from "../api/movieService.ts";
import type { MovieDetail } from '../types/types';

export const useMovieDetail = (id: string | undefined) => {
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchMovie = async () => {
            try {
                setIsLoading(true);
                const data = await movieService.getMovieById(id);
                setMovie(data);
                setError(null);
            } catch (err) {
                setError('Не удалось загрузить информацию о фильме');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    return { movie, isLoading, error };
};
