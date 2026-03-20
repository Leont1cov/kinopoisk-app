import { useEffect, useRef } from 'react';
import { useMovies } from "../../hooks/useMovies.ts";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.ts";
import { MovieCard } from "../../components/movie/MovieCard/MovieCard.tsx";
import styles from './HomePage.module.css';
import { Loader } from "../../components/ui/Loader/Loader.tsx";
import { useSearchParams } from "react-router-dom";

export const HomePage = () => {
    const [searchParams] = useSearchParams();

    const currentGenre = searchParams.get('genres.name');
    const searchQuery = searchParams.get('keyword');
    // Создаем уникальную строку из всех фильтров (жанр, год, рейтинг)
    const filtersKey = searchParams.toString();

    const getTitle = () => {
        if (searchQuery) return `Поиск: ${searchQuery}`;
        if (currentGenre) return `Жанр: ${currentGenre}`;
        return 'Популярные фильмы';
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{getTitle()}</h1>

            <MovieFeed key={filtersKey} />
        </div>
    );
};

// Внутренний компонент для самого списка
const MovieFeed = () => {
    const { movies, isLoading, hasMore, loadMovies } = useMovies();
    const pageRef = useRef(1);

    useEffect(() => {
        loadMovies(1);
    }, [loadMovies]);

    const scrollTriggerRef = useInfiniteScroll({
        isLoading,
        hasMore,
        onIntersect: () => {
            // Если идет загрузка, игнорируем событие
            if (isLoading || !hasMore) return;

            const nextPage = pageRef.current + 1;
            pageRef.current = nextPage;
            loadMovies(nextPage);
        }
    });

    return (
        <>
            <div className={styles.grid}>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            <div ref={scrollTriggerRef} className={styles.scrollArea}>
                {isLoading && <Loader />}

                {!isLoading && !hasMore && movies.length > 0 && (
                    <div className={styles.endBlock}>
                        <p className={styles.endBlockTitle}>
                            Вы посмотрели все доступные фильмы
                        </p>
                        <span className={styles.endBlockSubtext}>
                            Всего загружено: {movies.length}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};