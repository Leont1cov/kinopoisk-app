import type { Movie } from "../../../../../types/types.ts";
import styles from "./CompareMovieCard.module.css";

interface CompareMovieCardProps {
  movie: Movie;
  onRemove: (id: number) => void;
}

export const CompareMovieCard = ({
  movie,
  onRemove,
}: CompareMovieCardProps) => {
  return (
    <th className={styles.movieHeader}>
      <div className={styles.headerContent}>
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(movie.id)}
          title="Удалить из сравнения"
        >
          Удалить
        </button>
        <img src={movie.poster.url} alt={movie.name} />
        <span className={styles.movieName}>{movie.name}</span>
      </div>
    </th>
  );
};
