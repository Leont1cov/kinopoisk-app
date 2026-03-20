import styles from "./MovieGenres.module.css";

interface Genre {
    genre: string;
}

interface MovieGenresProps {
    genres: Genre[];
}

export const MovieGenres = ({ genres }: MovieGenresProps) => {
    if (genres.length === 0) return null;

    return (
        <div className={styles.genres}>
            {genres.map((g, index) => (
                <span key={index} className={styles.genreTag}>
                    {g.genre}
                </span>
            ))}
        </div>
    );
};
