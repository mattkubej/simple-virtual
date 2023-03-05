import styles from './VirtualizedList.module.css';

import { useRef, useState, useLayoutEffect } from 'react';

function getItems(count = 100000) {
  return new Array(count).fill(0).map((_, i) => `Item ${i}`);
}

const ITEM_COUNT = 100000;
const ITEM_HEIGHT = 25;
const LIST_HEIGHT = ITEM_COUNT * ITEM_HEIGHT;
const OVERSCAN = 10;

const items = getItems(ITEM_COUNT);

export default function VirtualizedList() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollContainerHeight, setScrollContainerHeight] = useState(0);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      setScrollContainerHeight(scrollContainerRef.current.clientHeight);
    }
  }, []);

  const handleScroll = (event: React.UIEvent) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = startIndex + Math.ceil(scrollContainerHeight / ITEM_HEIGHT);
  const visibleItems = items.slice(
    startIndex - OVERSCAN > 0 ? startIndex - OVERSCAN : 0,
    Math.min(items.length - 1, endIndex + OVERSCAN)
  );
  console.log(visibleItems);

  return (
    <div
      className={styles.ScrollContainer}
      ref={scrollContainerRef}
      onScroll={handleScroll}
    >
      <div className={styles.ListItemContainer} style={{ height: LIST_HEIGHT }}>
        {visibleItems.map((item, index) => {
          const offset = (startIndex + index) * ITEM_HEIGHT;
          return (
            <div
              key={item}
              className={styles.ListItem}
              style={{
                position: 'absolute',
                transform: `translateY(${offset}px)`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
