import { Link, NavLink } from "react-router-dom"
import styles from "./Header.module.css"

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link to="/">Кинопоиск</Link>

                <nav className={styles.nav}>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/favorites">Избранное</NavLink>
                    <NavLink to="/compare">Сравнение</NavLink>
                </nav>
            </div>

            <div className={styles.searchContainer}>
                <input type="text" placeholder="Поиск фильмов..." className={styles.searchInput}/>
            </div>
        </header>
    )
}