import type { Movie } from "../../../../../types/types.ts";
import styles from "./CompareTable.module.css";
import { CompareMovieCard } from "../CompareMovieCard/CompareMovieCard.tsx";

interface CompareTableProps {
  compareList: Movie[];
  removeFromCompare: (id: number) => void;
}

export const CompareTable = ({
  compareList,
  removeFromCompare,
}: CompareTableProps) => {
  if (compareList.length === 0) {
    return <p className={styles.empty}>Список сравнения пуст</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.stickyCol}>Параметр</th>
            {compareList.map((movie) => (
              <CompareMovieCard
                key={movie.id}
                movie={movie}
                onRemove={removeFromCompare}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.stickyCol}>Рейтинг Кинопоиск</td>
            {compareList.map((movie) => (
              <td key={movie.id}>
                <span className={styles.ratingBadge}>
                  {movie.rating.kp?.toFixed(1) || "—"}
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td className={styles.stickyCol}>Год выпуска</td>
            {compareList.map((movie) => (
              <td key={movie.id}>{movie.year}</td>
            ))}
          </tr>
          <tr>
            <td className={styles.stickyCol}>Жанры</td>
            {compareList.map((movie) => (
              <td key={movie.id} className={styles.genresCell}>
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((g) => g.genre).join(", ")
                  : "—"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
