import React, {useState} from 'react';
import { useFavorites} from "../../../hooks/useFavorites.ts";
import type { Movie } from '../../../types/types';
import styles from './FavoriteButton.module.css';
import {Modal} from "../../ui/Modal/Modal.tsx";

interface FavoriteButtonProps {
    movie: Movie;
    className?: string;
}

export const FavoriteButton = ({ movie, className }: FavoriteButtonProps) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const [showModal, setShowModal] = useState(false);
    const active = isFavorite(movie.id);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (active) {
            toggleFavorite(movie);
        } else {
            setShowModal(true);
        }
    };

    const handleConfirm = () => {
        toggleFavorite(movie);
        setShowModal(false);
    };


    return (
        <>
            <button
                className={`${styles.favoriteBtn} ${active ? styles.active : ''} ${className || ''}`}
                onClick={handleClick}
                title={active ? "Удалить из избранного" : "Добавить в избранное"}
            >
                <svg viewBox="0 0 24 24" className={styles.icon}>
                    <path d="M12 21s-6.716-4.534-9.192-7.01C.63 11.813.63 8.687 2.808 6.51 4.985 4.333 8.11 4.333 10.288 6.51L12 8.222l1.712-1.712c2.178-2.177 5.303-2.177 7.48 0 2.178 2.177 2.178 5.303 0 7.48C18.716 16.466 12 21 12 21z" />
                </svg>
            </button>

            <Modal
                isOpen={showModal}
                title="Добавить в избранное?"
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
            >
                Вы хотите добавить фильм «{movie.name}» в свой список.
            </Modal>
        </>
    );
};
