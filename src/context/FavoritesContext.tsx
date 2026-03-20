import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Movie } from "../types/types.ts";

interface FavoritesContextType {

    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
    isFavorite: (movieId: number) => boolean;
}

interface FavoritesProviderProps {
    children?: React.ReactNode;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ( { children }:FavoritesProviderProps )  => {
    // 1. Читаем из localStorage сразу при загрузке
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const saved = localStorage.getItem('kp_favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Автоматически сохраняем в localStorage при любом изменении
    useEffect(() => {
        localStorage.setItem('kp_favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie: Movie) => {
        setFavorites(prev => {
            const isAlreadyFavorite = prev.some(m => m.id === movie.id);
            if (isAlreadyFavorite) {
                // Удаляем, если уже есть
                return prev.filter(m => m.id !== movie.id);
            }
            // Добавляем, если нет
            return [...prev, movie];
        });
    };

    const isFavorite = (movieId: number) => {
        return favorites.some(m => m.id === movieId);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

// Тот самый хук, который ты хотел вызвать на странице
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
