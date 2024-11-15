// src/components/RepairCode.js
import React from 'react';
import styles from '../styles/RepairCode.module.css';


const RepairCode = ({ selectedSubSymptom, onRepairSelect }) => {
  const repairOptions = {
    'HA1-NO ENCIENDE(COMPRESSOR*)':['SRC000-CAMBIO DE PIEZA*'],
    'HA1-NO ENCIENDE':['SRC000-CAMBIO DE PIEZA(PCB DISPLAY)'],
    'HK1-RUIDO DE MOTOR':['SRC008-OTROS PROBLEMAS'],
    'HLC-NO FUNCIONA EL COMPRESSOR':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL1-ENCIENDE, PERO NO OPERA(IM)':['SRC000-CAMBIO DE PIEZA(IM)'],
    'HL1-ENCIENDE, PERO NO OPERA(COMPRESSOR)':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL2-OPERACION INTERMITENTE(COMPRESSOR)':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL1-ENCIENDE, PERO NO OPERA(PCB)':['SRC000-CAMBIO DE PIEZA(PCB)'],
    'HL2-OPERACION INTERMITENTE(PCB)':['SRC000-CAMBIO DE PIEZA(PCB)'],
    'HXB-CONEXION DE CABLE INCORRECTA':['SRC008-OTROS PROBLEMAS'],
    'HE2-ENFRIAMIENTO POBRE':['SRC000-CAMBIO DE PIEZA ','SRC008-OTROS PROBLEMAS '],
    'HE2-ENFRIAMIENTO POBRE(CONDENSER)':['SRC000-CAMBIO DE PIEZA(CONDENSER)'],
    'HE2-ENFRIAMINETO POBRE(SENSOR ELECTRONIC)':['SRC000-CAMBIO DE PIEZA(SENSOR ELECTRONIC)'],
    'HE3-ENFRIAMIENTO EXCESIVO(RT31)':['SRC001-REPARAR(RT31)'],
    'HE9-FUGA DE GAS(GAS LEAKAGE)':['SRC001-REPARAR(GAS LEAKAGE)'],
    'HE9-FUGA DE GAS':['SRC000-CAMBIO DE PIEZA(CONDENSER)'],
    'HE9-FUGA DE GAS**':['SRC001-REPARAR**'],
    'HG2-SIN SUMINISTRO DE AGUA':['SRC000-CAMBIO DE PIEZA(V)'],
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
            <button >{repairOption}</button>
          </div>
        ))
      ) : (
        <p>No hay opciones disponibles para este síntoma.</p>
      )}
    </div>
  );
};

export default RepairCode;


