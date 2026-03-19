import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import type { Movie } from "../../../types/types.ts";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const getRatingColor = (rating: number | null) => {
        if (!rating) return '#9e9e9e';
        if (rating > 7) return '#4caf50';
        if (rating > 5) return '#ff9800';
        return '#f44336';
    };

    return (
        <Link to={`/movie/${movie.id}`} className={styles.card}>
            <img
                src={movie.poster.url}
                alt={movie.name}
                className={styles.poster}
                loading="lazy"
            />

            <div className={styles.content}>
                <h3 className={styles.title} title={movie.name}>
                    {movie.name}
                </h3>

                <div className={styles.footer}>
                    <span className={styles.year}>
                        {movie.year ?? '—'}
                    </span>

                    <span
                        className={styles.rating}
                        style={{
                            backgroundColor: getRatingColor(movie.rating.kp) + '33',
                            color: getRatingColor(movie.rating.kp),
                        }}
                    >
                        {movie.rating.kp
                            ? movie.rating.kp.toFixed(1)
                            : 'N/A'}
                    </span>
                </div>
            </div>
        </Link>
    );
};