import { createPortal } from "react-dom";
import { useCompare } from "../../../hooks/useCompare";
import styles from "./CompareModal.module.css";

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CompareModal = ({ isOpen, onClose }: CompareModalProps) => {
    const { compareList, removeFromCompare } = useCompare();

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2>Сравнение характеристик</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </header>

                <div className={styles.content}>
                    {compareList.length === 0 ? (
                        <p className={styles.empty}>Список сравнения пуст</p>
                    ) : (
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                <tr>
                                    <th className={styles.stickyCol}>Параметр</th>
                                    {compareList.map(movie => (
                                        <th key={movie.id} className={styles.movieHeader}>
                                            <div className={styles.headerContent}>
                                                <button
                                                    className={styles.removeBtn}
                                                    onClick={() => removeFromCompare(movie.id)}
                                                >
                                                    Удалить
                                                </button>
                                                <img src={movie.poster.url} alt={movie.name} />
                                                <span className={styles.movieName}>{movie.name}</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className={styles.stickyCol}>Рейтинг Кинопоиск</td>
                                    {compareList.map(movie => (
                                        <td key={movie.id}>
                                                <span className={styles.ratingBadge} data-rating={movie.rating.kp}>
                                                    {movie.rating.kp?.toFixed(1) || '—'}
                                                </span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className={styles.stickyCol}>Год выпуска</td>
                                    {compareList.map(movie => (
                                        <td key={movie.id}>{movie.year}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className={styles.stickyCol}>Жанры</td>
                                    {compareList.map(movie => (
                                        <td key={movie.id} className={styles.genresCell}>
                                            Кино
                                        </td>
                                    ))}
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};
