import { createContext, useContext } from "react";
import type { Movie } from "../types/types.ts";

export interface CompareContextType {
  compareList: Movie[];
  addToCompare: (movie: Movie) => void;
  removeFromCompare: (movieId: number) => void;
  isInCompare: (movieId: number) => boolean;
}

export const CompareContext = createContext<CompareContextType | undefined>(
  undefined,
);

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
