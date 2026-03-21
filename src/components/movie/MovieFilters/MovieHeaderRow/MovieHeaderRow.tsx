import styles from "./MovieHeaderRow.module.css";

interface MovieHeaderRowProps {
  title: string;
  buttonText: string;
  onReset: () => void; // Добавляем функцию сброса
}

export const MovieHeaderRow = ({
  title,
  buttonText,
  onReset,
}: MovieHeaderRowProps) => {
  return (
    <div className={styles.headerRow}>
      <h3 className={styles.title}>{title}</h3>
      <button
        className={styles.resetButton}
        onClick={onReset} // Вешаем обработчик
        type="button"
      >
        {buttonText}
      </button>
    </div>
  );
};
