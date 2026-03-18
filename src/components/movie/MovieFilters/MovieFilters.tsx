import styles from "./MovieFilters.module.css"

interface MovieFiltersProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MovieFilters = ({ isOpen, onClose }: MovieFiltersProps) => {
    return (
        <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} onClick={onClose}>
            <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
            onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    <h3>Настройка фильтров</h3>
                </div>
            </div>
        </div>
    )
}