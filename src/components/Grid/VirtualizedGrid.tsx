import { useRef } from 'react';

import styles from './VirtualizedGrid.module.css';

import useVirtualizer from '@/hooks/use-virtualizer';

const OVERSCAN = 10;

interface Props {
  rowCount: number;
  columnCount: number;
}

export default function VirtualizedGrid({ rowCount, columnCount }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
                    {`${virtualRowIndex},${virtualColumnIndex}`}
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
