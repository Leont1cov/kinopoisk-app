import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {MoviePage} from "./pages/MoviePage.tsx";
import {FavoritePage} from "./pages/FavoritesPage.tsx";
import {ComparePage} from "./pages/ComparePage.tsx";
import {Header} from "./components/layout/Header/Header.tsx";
import {MovieFilters} from "./components/movie/MovieFilters/MovieFilters.tsx";

function App() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <Router>
            <div className="app">
                <Header onToggleFilters={() => setIsFilterOpen(!isFilterOpen)} />

                <MovieFilters isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/movie:id" element={<MoviePage/>} />
                    <Route path="/favorites" element={<FavoritePage/>}/>
                    <Route path="/compare" element={<ComparePage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
