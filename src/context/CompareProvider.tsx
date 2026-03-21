import React, { useState, useEffect } from "react";
import { CompareContext } from "../hooks/useCompare.ts";
import type { Movie } from "../types/types.ts";

export const CompareProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [compareList, setCompareList] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("kp_compare");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("kp_compare", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (movie: Movie) => {
    setCompareList((prev) => {
      // 1. Если фильм уже там — удаляем (Toggle)
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }

      // 2. Если уже 2 фильма — выкидываем первый (индекс 0), добавляем новый
      if (prev.length >= 2) {
        return [prev[1], movie]; // Оставляем второй, добавляем новый
      }

      // 3. Если меньше двух — просто добавляем
      return [...prev, movie];
    });
  };

  const removeFromCompare = (movieId: number) => {
    setCompareList((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isInCompare = (movieId: number) =>
    compareList.some((m) => m.id === movieId);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
