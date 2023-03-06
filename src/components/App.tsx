import styles from './App.module.css';

import { useReducer } from 'react';

import List from './List';
import VirtualizedList from './VirtualizedList';

interface Config {
  rowCount: number;
  virtualized: boolean;
}

function Controls({
  config,
  onChange,
}: {
  config: Config;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className={styles.Controls}>
      <label>
        row count:{' '}
        <input
          type="text"
          name="rowCount"
          value={config.rowCount}
          onChange={onChange}
        />
      </label>

      <label>
        virtualized:{' '}
        <input
          type="checkbox"
          name="virtualized"
          checked={config.virtualized}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

type ConfigUpdate = {
  [Key in keyof Config]: { name: Key; value: Config[Key] };
}[keyof Config];

function configReducer(state: Config, action: ConfigUpdate) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

function getConfigUpdate(event: React.ChangeEvent<HTMLInputElement>) {
  const { name, value, checked } = event.target;

  switch (name) {
    case 'rowCount':
      return {
        name,
        value: Number(value),
      };
    case 'virtualized':
      return {
        name,
        value: checked,
      };
    default:
      throw new Error(`Unknown config field: ${name}`);
  }
}

export default function App() {
  const [config, setConfig] = useReducer(configReducer, {
    rowCount: 1000,
    virtualized: false,
  });

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const configUpdate = getConfigUpdate(event);
    setConfig(configUpdate);
  };

  const { rowCount, virtualized } = config;

  console.log(rowCount);

  return (
    <div className={styles.App}>
      <div className={styles.Container}>
        <Controls config={config} onChange={handleConfigChange} />
        {virtualized ? (
          <VirtualizedList rowCount={rowCount} />
        ) : (
          <List rowCount={rowCount} />
        )}
      </div>
    </div>
  );
}
