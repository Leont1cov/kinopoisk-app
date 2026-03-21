import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${isOpen ? styles.modalOpen : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.message}>{children}</div>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Отмена
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Добавить
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
};
