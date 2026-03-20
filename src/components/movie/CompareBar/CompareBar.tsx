import { useCompare } from "../../../hooks/useCompare";
import { useState } from "react";
import { CompareModal } from "../CompareModal/CompareModal"; // Создадим следующим шагом
import styles from "./CompareBar.module.css";

export const CompareBar = () => {
    const { compareList, removeFromCompare } = useCompare();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (compareList.length === 0) return null;

    return (
        <>
            <div className={styles.bar}>
                <div className={styles.info}>
                    <span className={styles.count}>{compareList.length}</span>
                    <p>фильма в сравнении</p>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.compareBtn}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Сравнить характеристики
                    </button>
                    <button
                        className={styles.clearBtn}
                        onClick={() => compareList.forEach(m => removeFromCompare(m.id))}
                    >
                        Очистить
                    </button>
                </div>
            </div>

            <CompareModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
