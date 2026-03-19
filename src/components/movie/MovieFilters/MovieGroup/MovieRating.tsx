import styles from "./MovieGroup.module.css";

export const MovieRating = () => {
    return (
        <div className={styles.filterGroup}>
            <label>Рейтинг</label>
            <div className={styles.rangeRow}>
                <input type="number" placeholder="От 0" />
                <span>-</span>
                <input type="number" placeholder="До 10" />
            </div>
        </div>
    )
}