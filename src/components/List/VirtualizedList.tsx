import styles from './VirtualizedList.module.css';

import { useRef } from 'react';

import useVirtualizer from '@/hooks/use-virtualizer';

const ITEM_HEIGHT = 25;
const OVERSCAN = 10;

export default function VirtualizedList({ rowCount }: { rowCount: number }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    getScrollElement: () => scrollContainerRef.current,
    itemCount: rowCount,
    itemHeight: ITEM_HEIGHT,
    overscan: OVERSCAN,
    direction: 'vertical',
  });

  return (
    <div className={styles.ScrollContainer} ref={scrollContainerRef}>
      <div
        className={styles.ListItemContainer}
        style={{ height: virtualizer.getScrollableHeight() }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const virtualItemIndex = virtualItem.index;

          return (
            <div
              key={virtualItemIndex}
              className={styles.ListItem}
              style={{
                position: 'absolute',
                transform: `translateY(${virtualItem.offset}px)`,
              }}
            >
              {`Item ${virtualItemIndex + 1}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}
