import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { MoviePage } from "./pages/MoviePage/MoviePage.tsx";
import { FavoritePage } from "./pages/FavoritesPage/FavoritesPage.tsx";
import { Header } from "./components/layout/Header/Header.tsx";
import { MovieFilters } from "./components/movie/MovieFilters/MovieFilters.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import { CompareProvider } from "./context/CompareProvider.tsx";
import { CompareBar } from "./components/movie/CompareBar/CompareBar.tsx";

export const AppContent = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <FavoritesProvider>
      <CompareProvider>
        <Router>
          <div className="app">
            <Header onToggleFilters={() => setIsFilterOpen(!isFilterOpen)} />

            <MovieFilters
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/favorites" element={<FavoritePage />} />
            </Routes>

            <CompareBar />
          </div>
        </Router>
      </CompareProvider>
    </FavoritesProvider>
  );
};
