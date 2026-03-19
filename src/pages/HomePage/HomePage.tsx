import { useEffect, useState } from 'react';
import { useMovies } from "../../hooks/useMovies.ts";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.ts";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard.tsx";
import styles from './HomePage.module.css';
import { Loader } from "../../components/ui/Loader/Loader.tsx";

export const HomePage = () => {
    const [page, setPage] = useState(1);
    const { movies, isLoading, hasMore, error, loadMovies } = useMovies();

    // Infinite Scroll
    const scrollTriggerRef = useInfiniteScroll({
        isLoading,
        hasMore,
        onIntersect: () => setPage(prev => prev + 1)
    });

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