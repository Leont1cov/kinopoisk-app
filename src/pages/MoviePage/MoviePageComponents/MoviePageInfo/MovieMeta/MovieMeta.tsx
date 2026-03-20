import styles from "./MovieMeta.module.css";

interface MovieMetaProps {
    rating: number | string | null;
    year: number | string | null;
}

export const MovieMeta = ({ rating, year }: MovieMetaProps) => {
    const getRatingColor = (val: number | string | null) => {
        const num = Number(val);
        if (!num) return '#888';
        if (num >= 7) return 'var(--rating-green)';
        if (num >= 5) return 'var(--rating-orange)';
        return 'var(--rating-red)';
    };

    return (
        <div className={styles.meta}>
            <span className={styles.rating} style={{ backgroundColor: getRatingColor(rating) }}>
                {rating || '—'}
            </span>
            {year && <span className={styles.year}>{year} г.</span>}
        </div>
    );
};
