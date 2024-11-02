// src/components/InterimCode.js
import React from 'react';

const InterimCode = ({ selectedSymptom, onInterimSelect }) => {
  const interimCodes = [
    { name: 'Interim Code 1', code: 'I01' },
    { name: 'Interim Code 2', code: 'I02' },
  ];

  return (
    <div>
      <h2>Seleccione un código intermedio para el síntoma: {selectedSymptom}</h2>
      {interimCodes.map((interim) => (
        <div key={interim.code} onClick={() => onInterimSelect(interim.name)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' }}>
          <p>{interim.name}</p>
        </div>
      ))}
    </div>
  );
};

export default InterimCode;


