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
      <table className={styles.Table}>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, columnIndex) => {
                  return (
                    <td
                      key={`${rowIndex},${columnIndex}`}
                      className={styles.Cell}
                    >
                      <div
                        className={styles.Item}
                      >{`${rowIndex},${columnIndex}`}</div>
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
