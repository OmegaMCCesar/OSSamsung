// src/components/RepairCode.js
import React from 'react';

const RepairCode = ({ selectedSymptom, onRepairSelect }) => {
  const repairOptions = [
    { name: 'Reparación 1', code: 'R01' },
    { name: 'Reparación 2', code: 'R02' },
  ];

  return (
    <div>
      <h2>Seleccione una opción de reparación para el síntoma: {selectedSymptom}</h2>
      {repairOptions.map((repair) => (
        <div key={repair.code} onClick={() => onRepairSelect(repair.name)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' }}>
          <p>{repair.name}</p>
        </div>
      ))}
    </div>
  );
};

export default RepairCode;




