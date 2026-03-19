import styles from "./MovieFilters.module.css"
import {MovieHeaderRow} from "./MovieHeaderRow/MovieHeaderRow.tsx";
import {MovieFilterGroup} from "./MovieFilterGroup/MovieFilterGroup.tsx";
import {MovieGenreList} from "./MovieGroup/MovieGenreList.tsx";
import {MovieRating} from "./MovieGroup/MovieRating.tsx";
import {MovieYear} from "./MovieGroup/MovieYear.tsx";
import {useSearchParams} from "react-router-dom";
import {useState, useEffect} from "react";

interface MovieFiltersProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MovieFilters = ({ isOpen, onClose }: MovieFiltersProps) => {
    const [, setSearchParams] = useSearchParams();
    const [resetKey, setResetKey] = useState(0);

    useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    const handleReset = () => {
        setSearchParams({});
        setResetKey(prev => prev + 1);
    };

    return (
        <div
            className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
            onClick={onClose}
        >
            <div
                className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
                onClick={(e) => e.stopPropagation()}
                key={resetKey}
            >
                    <div className={styles.content}>
                        <MovieHeaderRow
                            title="Фильтры"
                            buttonText="Сбросить"
                            onReset={handleReset}
                        />
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