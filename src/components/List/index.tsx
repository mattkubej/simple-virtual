import SimpleList from './SimpleList';
import ViurtualizedList from './VirtualizedList';

interface Props {
  rowCount: number;
  virtualized?: boolean;
}

export default function List({ rowCount, virtualized }: Props) {
  if (virtualized) {
    return <ViurtualizedList rowCount={rowCount} />;
  }

  return <SimpleList rowCount={rowCount} />;
}
