import { Link, NavLink } from "react-router-dom"
import styles from "./Header.module.css"

interface HeaderProps {
    onToggleFilters: () => void;
}

export const Header = ({ onToggleFilters }:HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link to="/">Кинопоиск</Link>

                <nav className={styles.nav}>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/favorites">Избранное</NavLink>
                    <NavLink to="/compare">Сравнение</NavLink>
                </nav>
                <button className={styles.filterButton} onClick={onToggleFilters}>Фильтры</button>
            </div>

            <div className={styles.searchContainer}>
                <input type="text" placeholder="Поиск фильмов..." className={styles.searchInput}/>
            </div>
        </header>
    )
}