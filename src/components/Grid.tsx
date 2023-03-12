import styles from './Grid.module.css';

import { useState } from 'react';

import { getItems } from '@/utils/helpers';

export default function Grid({
  rowCount,
  columnCount,
}: {
  rowCount: number;
  columnCount: number;
}) {
  const cellCount = rowCount * columnCount;
  const [items, setItems] = useState(() => getItems(cellCount));
  if (items.length !== cellCount) setItems(getItems(cellCount));

  return (
    <div className={styles.ScrollContainer}>
      <table>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, columnIndex) => {
                  return (
                    <td key={`${rowIndex},${columnIndex}`}>
                      {items[rowIndex * columnCount + columnIndex]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
