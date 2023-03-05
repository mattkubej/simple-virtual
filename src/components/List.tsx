import styles from './List.module.css';

import { getItems } from '../utils/helpers';

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
