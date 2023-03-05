import { useReducer, useLayoutEffect, useState } from 'react';

import { Virtualizer, VirtualizerOptions } from './Virtualizer';

export default function useVirtualizer<TScrollElement extends Element>(
  options: VirtualizerOptions<TScrollElement>
) {
  const forceUpdate = useReducer((x: number) => x + 1, 0)[1];

  const resolvedOptions: VirtualizerOptions<TScrollElement> = {
    ...options,
    onChange: () => {
      forceUpdate();
      options.onChange?.();
    },
  };

  const virtualizer = useState(() => new Virtualizer(resolvedOptions))[0];

  virtualizer.setOptions(resolvedOptions);

  useLayoutEffect(() => {
    return virtualizer.initialize();
  }, [virtualizer]);

  return virtualizer;
}
