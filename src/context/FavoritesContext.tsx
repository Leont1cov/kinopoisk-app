import React, { useState, useEffect } from "react";
import { FavoritesContext } from "../hooks/useFavorites";
import type { Movie } from "../types/types.ts";

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("kp_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("kp_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((m) => m.id === movie.id);
      if (isAlreadyFavorite) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isFavorite = (movieId: number) =>
    favorites.some((m) => m.id === movieId);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
