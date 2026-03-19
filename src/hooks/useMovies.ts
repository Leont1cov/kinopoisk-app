import { useState, useCallback, useRef } from "react";
import { movieService } from "../api/movieService.ts";
import type { Movie } from "../types/types.ts";

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isFetching = useRef(false);

    const loadMovies = useCallback(async (currentPage: number) => {
        if (isFetching.current) return;

        const controller = new AbortController();

        try {
            isFetching.current = true;
            setIsLoading(true);

            const data = await movieService.getMovies(currentPage, 50);

            if (!data.docs.length) {
                setHasMore(false);
                return;
            }

            setMovies(prev => {
                const all = [...prev, ...data.docs];
                const uniqueMap = new Map(all.map(m => [m.id, m]));
                return Array.from(uniqueMap.values());
            });

            setHasMore(data.page < data.pages);

        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('Ошибка при загрузке данных');
            setHasMore(false);
            console.error(err);
        } finally {
            setIsLoading(false);
            isFetching.current = false;
        }

        return () => controller.abort(); // прерываем при размонтировании
    }, []);

    return { movies, isLoading, hasMore, error, loadMovies };
};