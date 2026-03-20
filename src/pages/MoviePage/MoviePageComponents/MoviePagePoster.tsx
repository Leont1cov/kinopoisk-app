import styles from "./MoviePagePoster.module.css";

interface MoviePagePosterProps {
    src: string;
    alt: string;
}

export const MoviePagePoster = ({ src, alt }: MoviePagePosterProps) => {
    return (
        <div className={styles.posterSection}>
            <img
                src={src}
                alt={alt}
                className={styles.poster}
            />
        </div>
    );
};