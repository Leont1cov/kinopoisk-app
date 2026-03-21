import styles from "../MoviePage.module.css";

interface MoviePageGroupProps {
  posterSection: React.ReactNode;
  infoSection: React.ReactNode;
}

export const MoviePageGroup = ({
  posterSection,
  infoSection,
}: MoviePageGroupProps) => {
  return (
    <div className={styles.content}>
      {posterSection}
      {infoSection}
    </div>
  );
};
