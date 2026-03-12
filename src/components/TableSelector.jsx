import { useState } from 'react';
import './TableSelector.css';

export default function TableSelector({ tables, onSelect, onCancel }) {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleConfirm = () => {
    if (selectedTable) {
      onSelect(selectedTable);
    }
  };

  return (
    <div className="table-selector">
      <h2 className="table-selector__title">Mesas</h2>

      <div className="table-selector__grid">
        {tables.map((table) => (
          <button
            key={table.id}
            className={`table-selector__item ${
              selectedTable?.id === table.id ? 'selected' : ''
            } ${!table.available ? 'unavailable' : ''}`}
            onClick={() => table.available && setSelectedTable(table)}
            disabled={!table.available}
          >
            <span className="table-selector__name">{table.name}</span>
            <div className="table-selector__status">
              <span className={`table-selector__indicator ${table.available ? 'available' : ''}`} />
              <span className="table-selector__capacity">{table.capacity}</span>
            </div>
            <span className="table-selector__availability">
              {table.available ? 'DISPONIBLE' : 'OCUPADA'}
            </span>
          </button>
        ))}
      </div>

      <div className="table-selector__actions">
        <button
          className="table-selector__btn table-selector__btn--primary"
          onClick={handleConfirm}
          disabled={!selectedTable}
        >
          Confirmar mesa
        </button>
        <button
          className="table-selector__btn table-selector__btn--secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
