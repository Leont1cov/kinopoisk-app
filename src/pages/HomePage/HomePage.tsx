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
    const currentGenre = searchParams.get('genres.name');

    useEffect(() => {
        loadMovies(page);
    }, [page, loadMovies]);

    const scrollTriggerRef = useInfiniteScroll({
        isLoading,
        hasMore,
        onIntersect: () => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', (page + 1).toString());
            setSearchParams(newParams, { replace: true });
        }
    });

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {currentGenre ? `Жанр: ${currentGenre}` : 'Популярные фильмы'}
            </h2>

            <div className={styles.grid}>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <div ref={scrollTriggerRef} className={styles.statusZone}>
                {isLoading && <Loader />}
                {!hasMore && !isLoading && movies.length > 0 && (
                    <div>Вы посмотрели все фильмы</div>
                )}
                {error && <div>{error}</div>}
            </div>
        </div>
    );
};