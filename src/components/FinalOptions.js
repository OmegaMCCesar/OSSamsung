// src/components/FinalOptions.js
import React from 'react';
import styles from '../styles/FinalOptions.module.css'

const FinalOptions = ({ selectedRepair, onFinalSelect }) => {
  const finalOptions = [
    { name: 'Opción Final 1', code: 'F01' },
    { name: 'Opción Final 2', code: 'F02' },
  ];

  return (
    <div className={styles.equipmentSelectionContainer} >
      <h2>Seleccione una opción final para la reparación: {selectedRepair}</h2>
      {finalOptions.map((final) => (
        <div key={final.code} onClick={() => onFinalSelect(final.name)} className={styles.finalOption}>
          <p>{final.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FinalOptions;



