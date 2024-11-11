// src/components/RepairCode.js
import React from 'react';
import styles from '../styles/RepairCode.module.css';

const RepairCode = ({ selectedSubSymptom, onRepairSelect }) => {
  const repairOptions = {
    'HK1-RUIDO DE MOTOR':['SRC008-OTROS PROBLEMAS'],
    'HLC-NO FUNCIONA EL COMPRESSOR':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL1-ENCIENDE, PERO NO OPERA(COMPRESSOR)':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL2-OPERACION INTERMITENTE(COMPRESSOR)':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'No funciona': ['Cambio de pieza', 'Lubricación'],
    'Obstrucción': ['Parcial', 'Completa'],
    'Ruido': ['Ajuste de componentes', 'Lubricación'],
    'Obstrucción parcial':['reparar']
  };

  const options = repairOptions[selectedSubSymptom];

  return (
    <div className={styles.container}>
      <h2>Seleccione el código de reparación para {selectedSubSymptom}</h2>
      {options ? (
        options.map((repairOption) => (
          <div key={repairOption} onClick={() => onRepairSelect(repairOption)} className={styles.option}>
            <p>{repairOption}</p>
          </div>
        ))
      ) : (
        <p>No hay opciones disponibles para este síntoma.</p>
      )}
    </div>
  );
};

export default RepairCode;


