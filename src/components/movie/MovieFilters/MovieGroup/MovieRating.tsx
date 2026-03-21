import styles from "./MovieGroup.module.css";
import { useSearchParams } from "react-router-dom";

export const MovieRating = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRange = searchParams.get("rating.kp") || "";
  const [from, to] = currentRange.split("-");

  const updateRating = (type: "from" | "to", value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const newFrom = type === "from" ? value : from;
    const newTo = type === "to" ? value : to;

    if (!newFrom && !newTo) {
      newParams.delete("rating.kp");
    } else {
      newParams.set("rating.kp", `${newFrom || ""}-${newTo || ""}`);
    }

    newParams.delete("page");
    setSearchParams(newParams);
  };

  return (
    <div className={styles.filterGroup}>
      <label>Рейтинг</label>
      <div className={styles.rangeRow}>
        <input
          type="number"
          placeholder="От 0"
          min="0"
          max="10"
          step="0.1"
          defaultValue={from || ""}
          onBlur={(e) => updateRating("from", e.target.value)}
        />
        <span>-</span>
        <input
          type="number"
          placeholder="До 10"
          min="0"
          max="10"
          step="0.1"
          defaultValue={to || ""}
          onBlur={(e) => updateRating("to", e.target.value)}
        />
      </div>
    </div>
  );
};
