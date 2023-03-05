import styles from './List.module.css';

function getItems(count = 100000) {
  return new Array(count).fill(0).map((_, i) => `Item ${i}`);
}

const items = getItems();

export default function List() {
  return (
    <div className={styles.ScrollContainer}>
      {items.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}
