import styles from './App.module.css';

// import List from './List';
import VirtualizedList from './VirtualizedList';

export default function App() {
  return (
    <div className={styles.App}>
      <div className={styles.Container}>
        <VirtualizedList />
      </div>
    </div>
  );
}
