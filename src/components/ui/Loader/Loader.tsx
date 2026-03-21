import styles from "./Loader.module.css";

interface LoaderProps {
  text?: string;
}

export const Loader = ({ text = "Загрузка..." }: LoaderProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};
