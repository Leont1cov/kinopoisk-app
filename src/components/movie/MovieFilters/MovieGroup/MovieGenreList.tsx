import styles from "./MovieGroup.module.css";

const GENRES = ["all", "драма", "комедия", "боевик", "фантастика", "триллер", "ужасы", "криминал",
    "мелодрама", "детектив", "мультфильм", "аниме", "приключения", "фэнтези",]

export const MovieGenreList = () => {
    return (
        <div className={styles.filterGroup}>
            <label>Жанр</label>
            <select>
                {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre === "all" ? "Все жанры" : genre}
                    </option>
                ))}
            </select>
        </div>
    )
}