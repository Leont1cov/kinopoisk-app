import { useState, useEffect } from "react";
import { movieService } from "../api/movieService";
import { useParams } from "react-router-dom";

export const useMovieDetail = () => {
  const { id } = useParams<{ id: string }>(); // Берем ID из URL
  const [movie, setMovie] = useState<any>(null); // Пока any, потом типизируем
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, isLoading, error };
};
