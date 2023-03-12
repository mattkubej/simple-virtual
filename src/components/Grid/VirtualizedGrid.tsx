import { useRef, useState } from 'react';

import styles from './VirtualizedGrid.module.css';

import useVirtualizer from '@/hooks/use-virtualizer';
import { getItems } from '@/utils/helpers';

const OVERSCAN = 10;

interface Props {
  rowCount: number;
  columnCount: number;
}

export default function VirtualizedGrid({ rowCount, columnCount }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // TODO: listen to prop changes and update items
  const cellCount = rowCount * columnCount;
  const [items, setItems] = useState(() => getItems(cellCount));
  if (items.length !== cellCount) setItems(getItems(cellCount));

  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => scrollContainerRef.current,
    itemCount: rowCount,
    itemHeight: 25,
    overscan: OVERSCAN,
    direction: 'vertical',
  });

  const columnVirtualizer = useVirtualizer({
    getScrollElement: () => scrollContainerRef.current,
    itemCount: columnCount,
    itemHeight: 75,
    overscan: OVERSCAN,
    direction: 'horizontal',
  });

  console.log(rowVirtualizer.getVirtualItems());

  return (
    <div className={styles.ScrollContainer} ref={scrollContainerRef}>
      <div
        style={{
          position: 'relative',
          height: rowVirtualizer.getScrollableHeight(),
          width: columnVirtualizer.getScrollableHeight(),
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const virtualRowIndex = virtualRow.index;

          return (
            <div
              key={virtualRowIndex}
              style={{
                display: 'contents',
              }}
            >
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => {
                const virtualColumnIndex = virtualColumn.index;

                return (
                  <div
                    key={`${virtualRowIndex},${virtualColumnIndex}`}
                    style={{
                      position: 'absolute',
                      transform: `translateX(${virtualColumn.offset}px) translateY(${virtualRow.offset}px)`,
                    }}
                  >
                    {items[virtualRowIndex * columnCount + virtualColumnIndex]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
