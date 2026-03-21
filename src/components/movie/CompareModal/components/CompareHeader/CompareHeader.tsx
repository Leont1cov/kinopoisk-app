import styles from "./CompareHeader.module.css";

interface CompareHeaderProps {
  onClose: () => void;
}

export const CompareHeader = ({ onClose }: CompareHeaderProps) => (
  <header className={styles.header}>
    <h2>Сравнение характеристик</h2>
    <button className={styles.closeBtn} onClick={onClose}>
      &times;
    </button>
  </header>
);
