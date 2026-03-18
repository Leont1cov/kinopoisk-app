import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import type { Movie } from "../../../types";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }:MovieCardProps) => {
    const getRatingColor = (rating: number) => {
        if (rating > 7) return '#4caf50'
        if (rating > 5) return '#ff9800'
        return '#f44336'
    }

    return (

        <Link to={`/movie/${movie.id}`} className={styles.card}>
            <img src={movie.poster?.previewUrl}
                 alt={movie.name} className={styles.poster}/>

            <div className={styles.content}>
                <h3 className={styles.title} title={movie.name}>
                    {movie.name || movie.englishName}
                </h3>

                <div className={styles.footer}>
                    <span className={styles.year}>{movie.year}</span>
                    <span className={styles.rating}
                    style={{backgroundColor: getRatingColor(movie.rating.kp) + '33',
                        color: getRatingColor(movie.rating.kp) }}>
                        {movie.rating.kp.toFixed(1)}
                    </span>
                </div>

            </div>
        </Link>
    )
}