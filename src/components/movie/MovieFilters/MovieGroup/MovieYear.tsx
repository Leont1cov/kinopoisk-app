import styles from "./MovieGroup.module.css";

export const MovieYear = () => {
    return (
        <div className={styles.filterGroup}>
            <label>Год</label>
            <div className={styles.rangeRow}>
                <input type="number" placeholder="От 1990" />
                <span>-</span>
                <input type="number" placeholder="До 2025" />
            </div>
        </div>
    )
}