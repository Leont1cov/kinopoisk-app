import styles from "./MovieDescription.module.css";

interface MovieDescriptionProps {
    description: string | null;
}

export const MovieDescription = ({ description }: MovieDescriptionProps) => (
    <div className={styles.description}>
        <h3>Описание</h3>
        <p>{description || 'Описание отсутствует'}</p>
    </div>
);
