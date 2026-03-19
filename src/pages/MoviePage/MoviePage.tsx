import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../../api/movieService';
import type { MovieDetail } from '../../types/types';
import { Loader } from '../../components/ui/Loader/Loader';
import styles from './MoviePage.module.css';

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
                ← Назад
            </button>

            <div className={styles.content}>
                <div className={styles.posterSection}>
                    <img
                        src={movie.posterUrl}
                        alt={movie.nameRu || 'Постер'}
                        className={styles.poster}
                    />
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.title}>{movie.nameRu || movie.nameOriginal}</h1>

                    <div className={styles.meta}>
                        <span className={styles.rating}>
                            ⭐ {movie.ratingKinopoisk || '—'}
                        </span>
                        <span className={styles.year}>{movie.year}г.</span>
                    </div>

                    <div className={styles.genres}>
                        {movie.genres.map((g, index) => (
                            <span key={index} className={styles.genreTag}>{g.genre}</span>
                        ))}
                    </div>

                    <div className={styles.description}>
                        <h3>Описание</h3>
                        <p>{movie.description || 'Описание отсутствует'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
