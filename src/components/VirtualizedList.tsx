import styles from './VirtualizedList.module.css';

import { useRef } from 'react';

import useVirtualizer from '@/hooks/use-virtualizer';
import { getItems } from '@/utils/helpers';

const ITEM_COUNT = 100000;
const ITEM_HEIGHT = 25;
const OVERSCAN = 10;

const items = getItems(ITEM_COUNT);

export default function VirtualizedList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    getScrollElement: () => scrollContainerRef.current,
    itemCount: items.length,
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
              {items[virtualItemIndex]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
