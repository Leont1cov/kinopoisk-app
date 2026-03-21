import styles from "./MovieFilterGroup.module.css";

interface MovieFilterGroupProps {
  genres: React.ReactNode;
  rating: React.ReactNode;
  year: React.ReactNode;
}

export const MovieFilterGroup = ({
  genres,
  rating,
  year,
}: MovieFilterGroupProps) => {
  return (
    <div className={styles.filtersGrid}>
      {genres}
      {rating}
      {year}
    </div>
  );
};
