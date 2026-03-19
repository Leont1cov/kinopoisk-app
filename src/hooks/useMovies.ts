import { useState, useCallback, useRef } from "react";
import { movieService } from "../api/movieService.ts";
import type { Movie } from "../types/types.ts";
import { useSearchParams } from "react-router-dom";

export const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isFetching = useRef(false);

    const [searchParams] = useSearchParams();

    const loadMovies = useCallback(async (currentPage: number) => {
        if (isFetching.current) return;

        try {
            isFetching.current = true;
            setIsLoading(true);

            const filters = Object.fromEntries(searchParams.entries());
            const data = await movieService.getMovies(currentPage, filters);

            setMovies(prev => {
                if (currentPage === 1) return data.docs;
                const all = [...prev, ...data.docs];
                const uniqueMap = new Map(all.map(m => [m.id, m]));
                return Array.from(uniqueMap.values());
            });
            setHasMore(data.page < data.pages);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            else setError('Ошибка при загрузке данных');
            setHasMore(false);
            console.error(err);
        } finally {
            setIsLoading(false);
            isFetching.current = false;
        }
    }, [searchParams.toString()]);

    return { movies, isLoading, hasMore, error, loadMovies };
};