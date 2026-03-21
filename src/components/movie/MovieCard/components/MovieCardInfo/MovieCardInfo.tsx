import React from "react";
import styles from "./MovieCardInfo.module.css";

interface MovieCardInfoProps {
  title: string;
  children: React.ReactNode;
}

export const MovieCardInfo = ({ title, children }: MovieCardInfoProps) => {
  return (
    <div className={styles.content}>
      <h3 className={styles.title} title={title}>
        {title}
      </h3>
      {children}
    </div>
  );
};
