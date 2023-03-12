import styles from './App.module.css';

import { useReducer } from 'react';

import List from './List';
import VirtualizedList from './VirtualizedList';
import Grid from './Grid';

const COMPONENT_TYPES = ['list', 'grid'] as const;
type ComponentType = typeof COMPONENT_TYPES[number];

interface Config {
  componentType: ComponentType;
  rowCount: number;
  columnCount: number;
  virtualized: boolean;
}

function Controls({
  config,
  onChange,
}: {
  config: Config;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}) {
  return (
    <div className={styles.Controls}>
      <label>
        component type:{' '}
        <select
          name="componentType"
          value={config.componentType}
          onChange={onChange}
        >
          {COMPONENT_TYPES.map((componentType) => (
            <option key={componentType} value={componentType}>
              {componentType}
            </option>
          ))}
        </select>
      </label>

      <label>
        row count:{' '}
        <input
          type="text"
          name="rowCount"
          value={config.rowCount}
          onChange={onChange}
        />
      </label>

      {config.componentType === 'grid' && (
        <label>
          column count:{' '}
          <input
            type="text"
            name="columnCount"
            value={config.columnCount}
            onChange={onChange}
          />
        </label>
      )}

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

function isType(value: string): value is ComponentType {
  return COMPONENT_TYPES.includes(value as ComponentType);
}

function getConfigUpdate(event: React.ChangeEvent<HTMLInputElement>) {
  const { name, value, checked } = event.target;

  switch (name) {
    case 'componentType':
      if (!isType(value)) {
        throw new Error(`Unknown type: ${value}`);
      }

      return {
        name,
        value,
      };
    case 'rowCount':
      return {
        name,
        value: Number(value),
      };
    case 'columnCount':
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
    componentType: 'list',
    rowCount: 100,
    columnCount: 100,
    virtualized: false,
  });

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const configUpdate = getConfigUpdate(event);
    setConfig(configUpdate);
  };

  const { componentType, rowCount, columnCount, virtualized } = config;

  return (
    <div className={styles.App}>
      <div className={styles.Container}>
        <Controls config={config} onChange={handleConfigChange} />
        {virtualized ? (
          <VirtualizedList rowCount={rowCount} />
        ) : componentType === 'list' ? (
          <List rowCount={rowCount} />
        ) : (
          <Grid rowCount={rowCount} columnCount={columnCount} />
        )}
      </div>
    </div>
  );
}
