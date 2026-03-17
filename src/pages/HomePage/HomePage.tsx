import styles from "./HomePage.module.css"
import {useEffect, useState} from "react";
import type { Movie } from "../../types";
import {movieService} from "../../api/movieService.ts";
import {MovieCard} from "../../components/movie/MovieCard.tsx";
import axios from "axios";

export const HomePage = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const data = await movieService.getMovies()
                setMovies(data.docs)
            } catch (err) {
                //TODO: нужно декомпозировать код ниже
                let errorMessage = 'Произошла неизвестная ошибка';

                if (axios.isAxiosError(err)) {
                    errorMessage = err.response?.data?.message || 'Ошибка при загрузке данных';

                    if (err.response?.status === 401) {
                        errorMessage = 'Неверный API ключ (401)';
                    }
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(errorMessage);
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false)
            }
        }
        fetchMovies()
    }, [])

    if (isLoading) {
        return <div className={styles.loader}>Загрузка фильмов...</div>
    }
    if (error) {
        return (
            <div>
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Повторить попытку</button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Популярные фильмы</h1>
            <div className={styles.grid}>
                {movies?.map((movie) => {
                   return <MovieCard key={movie.id} movie={movie} />
                })}
            </div>
        </div>
    )
}

