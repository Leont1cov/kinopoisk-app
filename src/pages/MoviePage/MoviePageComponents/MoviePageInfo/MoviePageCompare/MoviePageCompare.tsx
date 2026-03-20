import { useCompare} from "../../../../../hooks/useCompare.ts";
import type { Movie, MovieDetail} from "../../../../../types/types.ts";
import styles from "./MoviePageCompare.module.css";

interface MoviePageCompareProps {
    movie: MovieDetail;
}

export const MoviePageCompare = ({ movie }: MoviePageCompareProps) => {
    const { addToCompare, isInCompare } = useCompare();
    const active = isInCompare(movie.kinopoiskId);

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
    };

    return (
        <button
            onClick={handleCompareClick}
            className={`${styles.compareBtn} ${active ? styles.compareActive : ''}`}
        >
            {active ? 'В сравнении' : 'Сравнить характеристи'}
        </button>
    );
};
