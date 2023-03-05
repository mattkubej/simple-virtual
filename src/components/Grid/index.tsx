import SimpleGrid from './SimpleGrid';
import VirtualizedGrid from './VirtualizedGrid';

interface Props {
  rowCount: number;
  columnCount: number;
  virtualized?: boolean;
}

export default function Grid({ rowCount, columnCount, virtualized }: Props) {
  if (virtualized) {
    return <VirtualizedGrid rowCount={rowCount} columnCount={columnCount} />;
  }

  return <SimpleGrid rowCount={rowCount} columnCount={columnCount} />;
}
