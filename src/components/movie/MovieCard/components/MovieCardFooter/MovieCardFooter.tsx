import {getRatingColor} from "../../../../../utils/ratingHelpers.ts";
import styles from "./MovieCardFooter.module.css";

interface Props {
    year: number | null;
    rating: number | null;
}

export const MovieCardFooter = ({ year, rating }: Props) => {
    const color = getRatingColor(rating);

    return (
        <div className={styles.footer}>
            <span className={styles.year}>{year ?? '—'}</span>
            <span
                className={styles.rating}
                style={{
                    backgroundColor: `${color}33`,
                    color: color,
                }}
            >
                {rating ? rating.toFixed(1) : 'N/A'}
            </span>
        </div>
    );
};
