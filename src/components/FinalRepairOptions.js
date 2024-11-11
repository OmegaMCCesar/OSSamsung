// src/components/FinalRepairOptions.js
import React from 'react';
import styles from '../styles/FinalRepairOptions.module.css';

const FinalRepairOptions = ({ selectedRepairCode, onFinalSelect }) => {
  const finalOptions = {
    'SRC000-CAMBIO DE PIEZA(COMPRESSOR)':['A15-REMPLAZO DE COMPRESSOR'],
    'SRC008-OTROS PROBLEMAS':['X09-NEGATIVA DE REPARACION'],
    'Cambio de pieza': ['Cambio de compresor', 'Cambio de motor'],
    'Lubricación': ['Aplicación de lubricante', 'Cambio de lubricante'],
    'Reparación de conexiones': ['Reconexión de cables', 'Cambio de conexiones'],
    'Obstrucción': ['Parcial', 'Completa'], // Agrega esta opción si "Obstrucción" es uno de los códigos
    'reparar': ['agregar gas']
  };

  const options = finalOptions[selectedRepairCode];

  return (
    <div className={styles.container}>
      <h2>Seleccione la opción final para {selectedRepairCode}</h2>
      {options ? (
        options.map((finalOption) => (
          <div key={finalOption} onClick={() => onFinalSelect(finalOption)} className={styles.option}>
            <p>{finalOption}</p>
          </div>
        ))
      ) : (
        <p>No hay opciones disponibles para este código de reparación.</p>
      )}
    </div>
  );
};

export default FinalRepairOptions;


