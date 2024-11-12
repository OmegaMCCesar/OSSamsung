// src/components/FinalRepairOptions.js
import React from 'react';
import styles from '../styles/FinalRepairOptions.module.css';

const FinalRepairOptions = ({ selectedRepairCode, onFinalSelect }) => {
  const finalOptions = {
    'SRC000-CAMBIO DE PIEZA(CONDENSER)':['A02-REMPLAZO DE PARTES MECANICAS'],
    'SRC000-CAMBIO DE PIEZA ':['A01-REMPLAZO DE PARTES ELECTRICAS'],
    'SRC000-CAMBIO DE PIEZA*':['A01-REMPLAZO DE PARTES ELECTRICAS'],
    'SRC000-CAMBIO DE PIEZA(PCB DISPLAY)':['A10-CAMBIO DE LCD'],
    'SRC000-CAMBIO DE PIEZA(PCB)':['A04-REMPLAZO DE PCB'],
    'SRC000-CAMBIO DE PIEZA(COMPRESSOR)':['A15-REMPLAZO DE COMPRESSOR'],
    'SRC008-OTROS PROBLEMAS':['X09-NEGATIVA DE REPARACION'],
    'SRC008-OTROS PROBLEMAS ':['X09-NEGATIVA DE REPARACION'],
    'SRC001-REPARAR(GAS LEAKAGE)':['A13-AGREGAR REFRIGERANTE'],
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


