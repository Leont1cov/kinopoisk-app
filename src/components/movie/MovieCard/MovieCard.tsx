import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";
import type { Movie } from "../../../types/types.ts";
import {useFavorites} from "../../../hooks/useFavorites.ts";
import {MovieCardPoster} from "./components/MovieCardPoster/MovieCardPoster.tsx";
import {MovieCardFooter} from "./components/MovieCardFooter/MovieCardFooter.tsx";
import {MovieCardInfo} from "./components/MovieCardInfo/MovieCardInfo.tsx";
import {FavoriteButton} from "../FavoiteButton/FavoriteButton.tsx";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const { isFavorite } = useFavorites();
    const active = isFavorite(movie.id);

    return (
        /* Добавляем обычный класс 'card' для работы :global(.card) в дочерних стилях */
        <Link to={`/movie/${movie.id}`} className={`${styles.card} card`}>
            <FavoriteButton
                movie={movie}
                className={`
                    ${styles.cardFavorite} 
                    ${active ? 'active' : ''} 
                `}
            />

            <MovieCardPoster movie={movie} />

            <MovieCardInfo title={movie.name}>
                <MovieCardFooter
                    year={movie.year}
                    rating={movie.rating.kp}
                />
            </MovieCardInfo>
        </Link>
    );
};