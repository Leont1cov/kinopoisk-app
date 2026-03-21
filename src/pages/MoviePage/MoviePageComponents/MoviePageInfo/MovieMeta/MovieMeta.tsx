import styles from "./MovieMeta.module.css";
import { getRatingColor } from "../../../../../utils/ratingHelpers.ts";

interface MovieMetaProps {
  rating: number | string | null;
  year: number | string | null;
}

export const MovieMeta = ({ rating, year }: MovieMetaProps) => {
  const ratingValue = rating !== null ? Number(rating) : null;

  return (
    <div className={styles.meta}>
      <span
        className={styles.rating}
        style={{ backgroundColor: getRatingColor(ratingValue) }}
      >
        {rating || "—"}
      </span>
      {year && <span className={styles.year}>{year} г.</span>}
    </div>
  );
};
