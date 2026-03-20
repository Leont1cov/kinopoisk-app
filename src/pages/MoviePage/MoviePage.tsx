import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../../api/movieService';
import type { MovieDetail } from '../../types/types';
import { Loader } from '../../components/ui/Loader/Loader';
import styles from './MoviePage.module.css';
import {MoviePageGroup} from "./MoviePageGroup/MoviePageGroup.tsx";
import {MoviePagePoster} from "./MoviePageComponents/MoviePagePoster.tsx";
import {MoviePageInfo} from "./MoviePageComponents/MoviePageInfo/MoviePageInfo.tsx";

export const MoviePage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

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
                setError('Не удалось загрузить информацию о фильме');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (isLoading) return <div className={styles.center}><Loader /></div>;
    if (error || !movie) return <div className={styles.center}>{error || 'Фильм не найден'}</div>;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                Назад
            </button>

            <MoviePageGroup
                posterSection={<MoviePagePoster
                    src={movie.posterUrl} alt={movie.nameRu || 'Постер'}/>}
                infoSection={
                    <MoviePageInfo
                        title={movie.nameRu || movie.nameOriginal || 'Без названия'}
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
