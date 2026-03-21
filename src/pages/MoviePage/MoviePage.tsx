import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../../components/ui/Loader/Loader";
import { MoviePageGroup } from "./MoviePageGroup/MoviePageGroup.tsx";
import { MoviePagePoster } from "./MoviePageComponents/MoviePagePoster.tsx";
import { MoviePageInfo } from "./MoviePageComponents/MoviePageInfo/MoviePageInfo.tsx";
import { useMovieDetail } from "../../hooks/useMovieDetail.ts";
import styles from "./MoviePage.module.css";

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movie, isLoading, error } = useMovieDetail(id);

  if (isLoading)
    return (
      <div className={styles.center}>
        <Loader />
      </div>
    );
  if (error || !movie)
    return <div className={styles.center}>{error || "Фильм не найден"}</div>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Назад
      </button>

      <MoviePageGroup
        posterSection={
          <MoviePagePoster
            src={movie.posterUrl}
            alt={movie.nameRu || "Постер"}
          />
        }
        infoSection={
          <MoviePageInfo
            title={movie.nameRu || movie.nameOriginal || "Без названия"}
            rating={movie.ratingKinopoisk}
            year={movie.year}
            genres={movie.genres}
            description={movie.description}
            movie={movie}
          />
        }
      />
    </div>
  );
};
