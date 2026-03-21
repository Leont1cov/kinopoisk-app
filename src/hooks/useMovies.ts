import { useState, useCallback, useRef } from "react";
import { movieService } from "../api/movieService.ts";
import type { Movie } from "../types/types.ts";
import { useSearchParams } from "react-router-dom";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // СИНХРОННЫЙ ЗАМОК: он блокирует вызовы мгновенно
  const isFetching = useRef(false);
  const [searchParams] = useSearchParams();

  const loadMovies = useCallback(
    async (pageToLoad: number) => {
      // Проверяем замок ПЕРЕД всем остальным
      if (isFetching.current || !hasMore) return;

      try {
        isFetching.current = true;
        setIsLoading(true);

        const filters = Object.fromEntries(searchParams.entries());
        const data = await movieService.getMovies(pageToLoad, filters);

        setMovies((prev) => {
          const newItems = data.docs || [];
          if (pageToLoad === 1) return newItems;

          const all = [...prev, ...newItems];
          const uniqueMap = new Map(all.map((m) => [m.id, m]));
          return Array.from(uniqueMap.values());
        });

        setHasMore(pageToLoad < data.pages);
      } catch (err) {
        console.error("Ошибка в хуке:", err);
        setHasMore(false);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    },
    [searchParams.toString(), hasMore],
  );

  return { movies, isLoading, hasMore, loadMovies };
};
