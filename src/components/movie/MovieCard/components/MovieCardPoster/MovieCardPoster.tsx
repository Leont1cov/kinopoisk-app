import type { Movie } from "../../../../../types/types.ts";
import styles from "./MovieCardPoster.module.css";

interface Props {
  movie: Movie;
}

export const MovieCardPoster = ({ movie }: Props) => (
  <div className={styles.posterWrapper}>
    <img
      src={movie.poster.url}
      alt={movie.name}
      className={styles.poster}
      loading="lazy"
    />
  </div>
);
