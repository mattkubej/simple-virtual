type CleanupCallback = () => void;
type MaybeScrollElement<TScrollElement extends Element> = TScrollElement | null;
type Direction = 'vertical' | 'horizontal';

function addScrollOffsetListener<TScrollElement extends Element>(
  element: TScrollElement,
  direction: Direction,
  callback: (scrollOffset: number) => void
): CleanupCallback {
  const scrollAttribute = direction === 'vertical' ? 'scrollTop' : 'scrollLeft';

  const onScroll = () => {
    callback(element[scrollAttribute]);
  };

  element.addEventListener('scroll', onScroll, {
    passive: true,
  });

  return () => element.removeEventListener('scroll', onScroll);
}

export interface VirtualItem {
  index: number;
  offset: number;
}

export interface VirtualizerOptions<TScrollElement extends Element> {
  direction: Direction;
  getScrollElement: () => MaybeScrollElement<TScrollElement>;
  itemCount: number;
  itemHeight: number;
  onChange?: () => void;
  overscan: number;
}

export class Virtualizer<TScrollElement extends Element> {
  private options: VirtualizerOptions<TScrollElement>;

  private scrollElement: MaybeScrollElement<TScrollElement> = null;
  private scrollElementSize: number = 0;
  private scrollOffset: number = 0;

  private cleanupCallbacks: Array<CleanupCallback> = [];

  constructor(options: VirtualizerOptions<TScrollElement>) {
    this.options = options;
  }

  initialize() {
    this.scrollElement = this.options.getScrollElement();
    this.scrollElementSize = this.getScrollElementSize();

    this.addListeners();
    this.notify();

    return () => this.cleanup();
  }

  getVirtualItems(): VirtualItem[] {
    const { startIndex, endIndex } = this.getVirtualItemRange();

    return Array.from({ length: endIndex - startIndex }, (_, index) => {
      const itemIndex = index + startIndex;
      return {
        index: itemIndex,
        offset: itemIndex * this.options.itemHeight,
      };
    });
  }

  getScrollableHeight(): number {
    return this.options.itemCount * this.options.itemHeight;
  }

  setOptions(options: VirtualizerOptions<TScrollElement>) {
    this.options = options;
  }

  cleanup() {
    this.cleanupCallbacks.forEach((cleanup) => cleanup());
    this.cleanupCallbacks = [];
  }

  private getScrollElementSize(): number {
    const { direction } = this.options;
    const attribute = direction === 'vertical' ? 'clientHeight' : 'clientWidth';
    return this.scrollElement?.[attribute] ?? 0;
  }

  private addListeners() {
    if (!this.scrollElement) {
      return;
    }

    const onScrollOffsetChange = (scrollOffset: number) => {
      this.scrollOffset = scrollOffset;
      this.notify();
    };

    this.cleanupCallbacks.push(
      addScrollOffsetListener(
        this.scrollElement,
        this.options.direction,
        onScrollOffsetChange
      )
    );
  }

  private notify() {
    this.options.onChange?.();
  }

  private getVirtualItemRange(): {
    startIndex: number;
    endIndex: number;
  } {
    const { itemCount, itemHeight, overscan } = this.options;

    const startIndex = Math.floor(this.scrollOffset / itemHeight);

    const itemsInScrollElement = Math.ceil(this.scrollElementSize / itemHeight);
    const endIndex = startIndex + itemsInScrollElement;

    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.min(itemCount, endIndex + overscan),
    };
  }
}
