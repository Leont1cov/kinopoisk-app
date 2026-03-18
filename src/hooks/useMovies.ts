import { useState, useCallback } from "react";
import { movieService } from "../api/movieService.ts";
import type { Movie } from "../types";

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadMovies = useCallback(async (currentPage: number) => {
        if (isLoading) return;
        if (currentPage > 1 && movies.length >= currentPage * 20) return

        try {
            setIsLoading(true);

            const data = await movieService.getMovies(currentPage, 50);

            if (data.docs.length === 0) {
                setHasMore(false);
            } else {
                setMovies(prev => {
                    const all = [...prev, ...data.docs]
                    const uniqueMap = new Map(all.map(m => [m.id, m]))
                    return Array.from(uniqueMap.values());
                })
                setHasMore(data.page < data.pages);
            }

        } catch (err) {
            setError('Ошибка при загрузке данных');
            setHasMore(false);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore])
    return { movies, isLoading, hasMore, error, loadMovies };
}