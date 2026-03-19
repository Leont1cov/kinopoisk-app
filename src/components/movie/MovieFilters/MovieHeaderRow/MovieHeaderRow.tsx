import styles from "./MovieHeaderRow.module.css";

interface MovieHeaderRowProps {
    title: string;
    buttonText: string;
}

export const MovieHeaderRow = ({title, buttonText}: MovieHeaderRowProps) => {
    return (
        <div className={styles.headerRow}>
            <h3 className={styles.title}>{title}</h3>
            <button className={styles.resetButton}>
                {buttonText}
            </button>
        </div>
    )
}