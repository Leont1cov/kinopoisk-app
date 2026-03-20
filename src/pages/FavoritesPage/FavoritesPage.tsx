import { useFavorites} from "../../hooks/useFavorites.ts";
import { MovieCard} from "../../components/movie/MovieCard/MovieCard.tsx";
import styles from "../HomePage/HomePage.module.css";
import stylesFavoritePage from "./FavoritesPage.module.css"

export const FavoritePage = () => {
    const { favorites } = useFavorites();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Избранные фильмы</h1>

            {favorites.length === 0 ? (
                <div className={stylesFavoritePage.titleContainer}>
                    <p className={stylesFavoritePage.title}>Список избранного пуст</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {favorites.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};