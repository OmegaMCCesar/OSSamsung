// src/components/SymptomCode.js
import React from 'react';

const SymptomCode = ({ onSymptomSelect }) => {
  const symptoms = [
    { name: 'No enciende', code: 'S01' },
    { name: 'Fuga de agua', code: 'S02' },
    { name: 'Ruidos extraños', code: 'S03' },
  ];

  return (
    <div>
      <h2>Seleccione un síntoma</h2>
      {symptoms.map((symptom) => (
        <div key={symptom.code} onClick={() => onSymptomSelect(symptom.name)} style={{ cursor: 'pointer', margin: '10px', border: '1px solid black', padding: '10px' }}>
          <p>{symptom.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SymptomCode;






