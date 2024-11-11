// src/components/SymptomBlock.js
import React from 'react';
import styles from '../styles/SymptomCode.module.css';

const SymptomBlock = ({ selectedBlock, onSymptomSelect }) => {
  const symptomBlocks = {
    '4B01-COMPRESSOR':[{simtom:'SRC015-RUIDO',description:'Usar este codigo cuando el motor presenta un sonido anomalo'},{simtom:'SRC013-PROBLEMAS DE OPERACION(COMPRESSOR)', description:'Usamos este codigo cuando el motor no funciona correctamente, puede ser el compresor dañado, mal conectado o alguna razon por la cual el compresor no puede trabajar de manera adecuada'}],
    Compresor: ['Ruido', 'Problemas de operación'],
    Evaporador: ['Obstrucción', 'Fuga'],
    Motor: ['No gira', 'Vibración'],
    Transmisión: ['Desgaste', 'Falla mecánica'],
    Encendido: ['Chispa débil', 'No enciende'],
    Quemador: ['Falla de llama', 'Obstrucción'],
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de síntoma para {selectedBlock}</h2>
      {symptomBlocks[selectedBlock].map((symptom) => (
        <div key={symptom.simtom}  className={styles.option}>
          <p onClick={() => onSymptomSelect(symptom.simtom)} >{symptom.simtom}</p>
          <textarea>{symptom.description}</textarea>
        </div>       
      ))}
    </div>
  );
};

export default SymptomBlock;

