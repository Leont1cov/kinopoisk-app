import { MovieMeta } from "./MovieMeta/MovieMeta.tsx";
import { MovieGenres } from "./MovieGenres/MovieGenres.tsx";
import { MovieDescription } from "./MovieDescription/MovieDescription.tsx";
import type {Genre} from "../../../../types/types.ts";
import styles from "./MoviePageInfo.module.css"

interface MoviePageInfoProps {
    title: string;
    rating: number | string | null;
    year: number | string | null;
    genres: Genre[];
    description: string | null;
}

export const MoviePageInfo = ({
                                  title,
                                  rating,
                                  year,
                                  genres,
                                  description
                              }: MoviePageInfoProps) => {
    return (
        <div className={styles.infoSection}>
            <h1 className={styles.title}>{title}</h1>
            <MovieMeta rating={rating} year={year} />
            <MovieGenres genres={genres} />
            <MovieDescription description={description} />
        </div>
    );
};
