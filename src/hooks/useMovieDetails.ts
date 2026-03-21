import { useState, useEffect } from "react";
import { movieService } from "../api/movieService";
import { useParams } from "react-router-dom";
import type { MovieDetail } from "../types/types.ts";

export const useMovieDetail = () => {
  const { id } = useParams<{ id: string }>();
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
      } catch (err) {
        setError("Не удалось загрузить информацию о фильме");
        console.error(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, isLoading, error };
};
