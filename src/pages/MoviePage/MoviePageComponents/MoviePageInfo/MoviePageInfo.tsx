import { MovieMeta } from "./MovieMeta/MovieMeta.tsx";
import { MovieGenres } from "./MovieGenres/MovieGenres.tsx";
import { MovieDescription } from "./MovieDescription/MovieDescription.tsx";
import type {Genre} from "../../../../types/types.ts";
import styles from "./MoviePageInfo.module.css"
import type { Movie, MovieDetail } from "../../../../types/types.ts";
import {useCompare} from "../../../../hooks/useCompare.ts";

interface MoviePageInfoProps {
    title: string;
    rating: number | string | null;
    year: number | string | null;
    genres: Genre[];
    description: string | null;
    movie: MovieDetail;
}

export const MoviePageInfo = ({
                                  title,
                                  rating,
                                  year,
                                  genres,
                                  description,
                                  movie
                              }: MoviePageInfoProps) => {
    const { addToCompare, isInCompare } = useCompare()
    const active = movie ? isInCompare(movie.kinopoiskId) : false;

    const handleCompareClick = () => {
        const movieToCompare: Movie = {
            id: movie.kinopoiskId,
            name: movie.nameRu || movie.nameOriginal || 'Без названия',
            poster: { url: movie.posterUrl },
            rating: { kp: movie.ratingKinopoisk },
            year: movie.year,
            votes: { kp: 0 }
        };

        addToCompare(movieToCompare);
    }

    if (!movie) return null;

    return (
        <div className={styles.infoSection}>
            <h1 className={styles.title}>{title}</h1>
            <MovieMeta rating={rating} year={year} />
            <MovieGenres genres={genres} />
            <button
                onClick={handleCompareClick}
                className={`${styles.compareBtn} ${active ? styles.compareActive : ''}`}
            >
                {active ? 'В сравнении' : 'Сравнить'}
            </button>
            <MovieDescription description={description} />
        </div>
    );
};
