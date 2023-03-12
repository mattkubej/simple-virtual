import styles from './SimpleList.module.css';

export default function SimpleList({ rowCount }: { rowCount: number }) {
  return (
    <div className={styles.ScrollContainer}>
      {Array.from({ length: rowCount }).map((_, index) => (
        <div key={index} className={styles.ListItem}>
          {`Item ${index + 1}`}
        </div>
      ))}
    </div>
  );
}
