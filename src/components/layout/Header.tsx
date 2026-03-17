import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header style={{ padding: '20px', background: '#1a1a1a', color: 'white', display: 'flex', gap: '20px' }}>
            <Link to="/" style={{ color: 'white', fontWeight: 'bold' }}>Кинопоиск</Link>

            <nav style={{ display: 'flex', gap: '15px' }}>
                <Link to="/" style={{ color: 'white' }}>Главная</Link>
                <Link to="/favorites" style={{ color: 'white' }}>Избранное</Link>
                <Link to="/compare" style={{ color: 'white' }}>Сравнение</Link>
            </nav>
        </header>
    )
}