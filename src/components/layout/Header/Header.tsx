import { Link, NavLink, useSearchParams } from "react-router-dom";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";

interface HeaderProps {
  onToggleFilters: () => void;
}

export const Header = ({ onToggleFilters }: HeaderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("keyword") || "",
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);

      if (searchTerm) {
        newParams.set("keyword", searchTerm);
      } else {
        newParams.delete("keyword");
      }

      // Сбрасываем страницу на первую при поиске
      newParams.delete("page");
      setSearchParams(newParams, { replace: true });
    }, 500);

    return () => clearTimeout(timer); // Очищаем таймер, если пользователь нажал клавишу снова
  }, [searchTerm, setSearchParams]);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/">Кинопоиск</Link>

        <nav className={styles.nav}>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/favorites">Избранное</NavLink>
        </nav>
        <button className={styles.filterButton} onClick={onToggleFilters}>
          Фильтры
        </button>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Поиск фильмов..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </header>
  );
};
