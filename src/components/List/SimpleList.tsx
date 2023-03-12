import styles from './SimpleList.module.css';

import { useState } from 'react';

import { getItems } from '@/utils/helpers';

export default function SimpleList({ rowCount }: { rowCount: number }) {
  const [items, setItems] = useState(() => getItems(rowCount));
  if (items.length !== rowCount) setItems(getItems(rowCount));

  return (
    <div className={styles.ScrollContainer}>
      {items.map((item, index) => (
        <div key={index} className={styles.ListItem}>
          {item}
        </div>
      ))}
    </div>
  );
}
