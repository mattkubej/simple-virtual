import styles from './SimpleGrid.module.css';

export default function SimpleGrid({
  rowCount,
  columnCount,
}: {
  rowCount: number;
  columnCount: number;
}) {
  return (
    <div className={styles.ScrollContainer}>
      <table>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, columnIndex) => {
                  return (
                    <td key={`${rowIndex},${columnIndex}`}>
                      {`${rowIndex},${columnIndex}`}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
