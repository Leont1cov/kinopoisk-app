import styles from "./MovieFilters.module.css"
import {MovieHeaderRow} from "./MovieHeaderRow/MovieHeaderRow.tsx";
import {MovieFilterGroup} from "./MovieFilterGroup/MovieFilterGroup.tsx";
import {MovieGenreList} from "./MovieGroup/MovieGenreList.tsx";
import {MovieRating} from "./MovieGroup/MovieRating.tsx";
import {MovieYear} from "./MovieGroup/MovieYear.tsx";

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
                        <MovieHeaderRow title="Фильтры" buttonText="Сбросить"/>
                        <MovieFilterGroup
                            genres={<MovieGenreList/>}
                            rating={<MovieRating/>}
                            year={<MovieYear/>}
                        />
                    </div>
                </div>
            </div>

    );

}