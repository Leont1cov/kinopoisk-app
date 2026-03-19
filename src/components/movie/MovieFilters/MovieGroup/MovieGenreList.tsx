import styles from "./MovieGroup.module.css";
import { useSearchParams } from "react-router-dom";

const GENRES = ["all", "драма", "комедия", "боевик", "фантастика", "триллер", "ужасы", "криминал",
    "мелодрама", "детектив", "мультфильм", "аниме", "приключения", "фэнтези",]

export const MovieGenreList = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleChange = (value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (value === "all") {
            newParams.delete("genres.name");
        } else {
            newParams.set("genres.name", value);
        }

        // ОБЯЗАТЕЛЬНО: Сбрасываем страницу на первую при смене фильтра
        newParams.delete("page");
        setSearchParams(newParams);
    };


    return (
        <div className={styles.filterGroup}>
            <label>Жанр</label>
            <select
                value={searchParams.get("genres.name") || "all"}
                onChange={(e) => handleChange(e.target.value)}
            >
                {GENRES.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre === "all" ? "Все жанры" : genre}
                    </option>
                ))}
            </select>
        </div>
    )
}