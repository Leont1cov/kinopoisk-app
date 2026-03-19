import { useEffect } from 'react';
import { useMovies } from "../../hooks/useMovies.ts";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.ts";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard.tsx";
import styles from './HomePage.module.css';
import { Loader } from "../../components/ui/Loader/Loader.tsx";
import { useSearchParams } from "react-router-dom";

export const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { movies, isLoading, hasMore, error, loadMovies } = useMovies();

    const page = Number(searchParams.get('page')) || 1;
    // Infinite Scroll
    const scrollTriggerRef = useInfiniteScroll({
        isLoading,
        hasMore,
        onIntersect: () => {
            // Вместо setPage мы просто обновляем URL
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', (page + 1).toString());
            // replace: true, чтобы не забивать историю браузера кнопке "Назад"
            setSearchParams(newParams, { replace: true });
        }
    });

    useEffect(() => {
        loadMovies(page);
    }, [page, loadMovies]);

    // Загрузка первой страницы
    useEffect(() => {
        loadMovies(1);
    }, [loadMovies]);

    useEffect(() => {
        if (page > 1) loadMovies(page);
    }, [page, loadMovies]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Популярные фильмы</h1>

            <div className={styles.grid}>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <div ref={scrollTriggerRef} className={styles.statusZone}>
                {isLoading && <Loader />}
                {!hasMore && !isLoading && <div>Вы посмотрели все фильмы</div>}
                {error && <div>{error}</div>}
            </div>
        </div>
    );
};