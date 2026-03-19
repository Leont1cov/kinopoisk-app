import { useSearchParams } from "react-router-dom";
import styles from "./MovieGroup.module.css";

export const MovieYear = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Извлекаем текущий диапазон из URL (например, "1990-2024")
    const currentRange = searchParams.get("year") || "";
    const [from, to] = currentRange.includes("-") ? currentRange.split("-") : [currentRange, ""];

    const updateYear = (type: "from" | "to", value: string) => {
        const newParams = new URLSearchParams(searchParams);

        // 2. Валидация: Год не должен быть "обрубком" (например, "2")
        // Если пользователь стер всё — это ок, удаляем фильтр.
        // Если ввел 1-3 цифры — игнорируем, чтобы не спамить ошибками API.
        if (value.length > 0 && value.length < 4) return;

        const newFrom = type === "from" ? value : from;
        const newTo = type === "to" ? value : to;

        if (!newFrom && !newTo) {
            newParams.delete("year");
        } else {
            // Формируем строку "1990-2025" или "1990-"
            newParams.set("year", `${newFrom || ""}-${newTo || ""}`);
        }

        // 3. Сбрасываем страницу на 1 при любом изменении фильтра
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
                    min="1888" max="2026"
                    defaultValue={from || ""}
                    // Используем onBlur, чтобы запрос улетал только когда ввод закончен
                    onBlur={(e) => updateYear("from", e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && updateYear("from", e.currentTarget.value)}
                />
                <span>-</span>
                <input
                    type="number"
                    placeholder="До 2026"
                    min="1888" max="2026"
                    defaultValue={to || ""}
                    onBlur={(e) => updateYear("to", e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && updateYear("to", e.currentTarget.value)}
                />
            </div>
        </div>
    );
};
