import styles from "./MovieFilters.module.css"

interface MovieFiltersProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MovieFilters = ({ isOpen, onClose }: MovieFiltersProps) => {
    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
            onClick={onClose}
        >
            <div
                className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.content}>
                    <div className={styles.content}>
                        <div className={styles.headerRow}>
                            <h3>Фильтры</h3>
                            <button className={styles.resetButton}>
                                Сбросить
                            </button>
                        </div>

                        <div className={styles.filtersGrid}>

                            {/* ЖАНР */}
                            <div className={styles.filterGroup}>
                                <label>Жанр</label>
                                <select

                                >
                                    <option value="all">Все жанры</option>
                                    <option value="драма">Драма</option>
                                    <option value="комедия">Комедия</option>
                                    <option value="боевик">Боевик</option>
                                    <option value="фантастика">Фантастика</option>
                                    <option value="триллер">Триллер</option>
                                    <option value="ужасы">Ужасы</option>
                                    <option value="криминал">Криминал</option>
                                    <option value="мелодрама">Мелодрама</option>
                                    <option value="детектив">Детектив</option>
                                    <option value="мультфильм">Мультфильм</option>
                                    <option value="аниме">Аниме</option>
                                    <option value="приключения">Приключения</option>
                                    <option value="фэнтези">Фэнтези</option>
                                </select>
                            </div>

                            {/* РЕЙТИНГ */}
                            <div className={styles.filterGroup}>
                                <label>Рейтинг</label>
                                <div className={styles.rangeRow}>
                                    <input type="number" placeholder="От 0" />
                                    <span>-</span>
                                    <input type="number" placeholder="До 10" />
                                </div>
                            </div>

                            {/* ГОД */}
                            <div className={styles.filterGroup}>
                                <label>Год</label>
                                <div className={styles.rangeRow}>
                                    <input type="number" placeholder="От 1990" />
                                    <span>-</span>
                                    <input type="number" placeholder="До 2025" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}