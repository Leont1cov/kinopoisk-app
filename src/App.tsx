import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {MoviePage} from "./pages/MoviePage.tsx";
import {FavoritePage} from "./pages/FavoritesPage.tsx";
import {ComparePage} from "./pages/ComparePage.tsx";
import {Header} from "./components/layout/Header.tsx";

function App() {
    return (
        <Router>
            <div className="app">
                <Header />

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
