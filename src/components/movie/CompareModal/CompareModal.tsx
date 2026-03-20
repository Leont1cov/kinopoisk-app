import { createPortal } from "react-dom";
import { useCompare } from "../../../hooks/useCompare";
import styles from "./CompareModal.module.css";
import {CompareHeader} from "./components/CompareHeader/CompareHeader.tsx";
import {CompareTable} from "./components/CompareTable/CompareTable.tsx";

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CompareModal = ({ isOpen, onClose }: CompareModalProps) => {
    const { compareList, removeFromCompare } = useCompare();

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <CompareHeader onClose={onClose} />

                <div className={styles.content}>
                    <CompareTable
                        compareList={compareList}
                        removeFromCompare={removeFromCompare}
                    />
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")!
    );
};
