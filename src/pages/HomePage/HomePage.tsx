import { useEffect, useState, useRef } from 'react';
import { movieService } from "../../api/movieService.ts";
import type { Movie } from "../../types";
import { MovieCard } from "../../components/movie/MovieCard.tsx";
import styles from './HomePage.module.css';

// TODO: Понять как работет этот код (КАЖДАЯ СТРОЧКА) и декомпозировать
export const HomePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Маяк, за которым следит браузер
    const scrollTrigger = useRef<HTMLDivElement>(null);

    const loadMovies = async (currentPage: number) => {
        if (isLoading) return; // Не даем запустить загрузку, если она уже идет
        if (currentPage > 1 && movies.length >= currentPage * 20) return

        try {
            setIsLoading(true);
            console.log(`Запрос страницы №${currentPage}`);

            const data = await movieService.getMovies(currentPage, 50);

            if (data.docs.length === 0) {
                setHasMore(false);
            } else {
                setMovies(prev => {
                    const all = [...prev, ...data.docs]
                    const uniqueMap = new Map(all.map(m => [m.id, m]))
                    return Array.from(uniqueMap.values());
                })
            }

        } catch (err) {
            setError('Ошибка при загрузке данных');
            setHasMore(false);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // 1. Самая первая загрузка при старте
    useEffect(() => {
        loadMovies(1);
    }, []);

    // 2. Настройка слежки за скроллом
    useEffect(() => {
        if (isLoading || !hasMore) return; // Не следим, если грузим или всё загрузили

        const observer = new IntersectionObserver((entries) => {

            if (entries[0].isIntersecting && !isLoading && hasMore) {
                console.log('Маяк в поле зрения, грузим следующую страницу...');
                setPage(prev => prev + 1);
            }
        }, { threshold: 0.1, rootMargin: '200px' });

        if (scrollTrigger.current) {
            observer.observe(scrollTrigger.current);
        }

        return () => observer.disconnect();
    }, [isLoading, hasMore, page]);

    // 3. Реакция на изменение страницы
    useEffect(() => {
        if (page > 1) {
            loadMovies(page);
        }
    }, [page]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Популярные фильмы</h1>

            <div className={styles.grid}>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Элемент-маяк. */}
            <div ref={scrollTrigger} className={styles.statusZone}>
                {isLoading && <div className={styles.loader}>Загрузка новых фильмов...</div>}

                {!hasMore && movies.length > 0 && (
                    <div className={styles.endMessage}>Вы посмотрели все фильмы</div>
                )}

                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    );
};
