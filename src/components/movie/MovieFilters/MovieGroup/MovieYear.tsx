import { useSearchParams } from "react-router-dom";
import styles from "./MovieGroup.module.css";

export const MovieYear = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentRange = searchParams.get("year") || "";
  const [from, to] = currentRange.includes("-")
    ? currentRange.split("-")
    : [currentRange, ""];

  const updateYear = (type: "from" | "to", value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value.length > 0 && value.length < 4) return;

    const newFrom = type === "from" ? value : from;
    const newTo = type === "to" ? value : to;

    if (!newFrom && !newTo) {
      newParams.delete("year");
    } else {
      newParams.set("year", `${newFrom || ""}-${newTo || ""}`);
    }

    newParams.delete("page");
    setSearchParams(newParams);
  };

  return (
    <div className={styles.filterGroup}>
      <label>Год выпуска</label>
      <div className={styles.rangeRow}>
        <input
          type="number"
          placeholder="От 1990"
          min="1888"
          max="2026"
          defaultValue={from || ""}
          onBlur={(e) => updateYear("from", e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && updateYear("from", e.currentTarget.value)
          }
        />
        <span>-</span>
        <input
          type="number"
          placeholder="До 2026"
          min="1888"
          max="2026"
          defaultValue={to || ""}
          onBlur={(e) => updateYear("to", e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && updateYear("to", e.currentTarget.value)
          }
        />
      </div>
    </div>
  );
};
