import { createContext, useContext } from "react";
import type { Movie } from "../types/types.ts";

export interface FavoritesContextType {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
