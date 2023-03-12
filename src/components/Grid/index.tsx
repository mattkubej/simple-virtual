import SimpleGrid from './SimpleGrid';

interface Props {
  rowCount: number;
  columnCount: number;
}

export default function Grid({ rowCount, columnCount }: Props) {
  return <SimpleGrid rowCount={rowCount} columnCount={columnCount} />;
}
