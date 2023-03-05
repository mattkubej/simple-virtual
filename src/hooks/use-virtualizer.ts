import { useReducer, useLayoutEffect, useState } from 'react';

import { Virtualizer, VirtualizerOptions } from '../utils/Virtualizer';

export default function useVirtualizer<TScrollElement extends Element>(
  options: VirtualizerOptions<TScrollElement>
) {
  const forceUpdate = useReducer((x: number) => x + 1, 0)[1];

  const virtualizer = useState(
    () =>
      new Virtualizer({
        ...options,
        onChange: () => {
          forceUpdate();
          options.onChange?.();
        },
      })
  )[0];

  useLayoutEffect(() => {
    return virtualizer.initialize();
  }, [virtualizer]);

  return virtualizer;
}
