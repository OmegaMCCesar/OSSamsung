// src/components/SubSymptom.js
import React from 'react';
import styles from '../styles/SubSymptom.module.css';

const SubSymptom = ({ selectedSymptom, onSubSymptomSelect }) => {
  const subSymptoms = {
    'SRC015-RUIDO':['HK1-RUIDO DE MOTOR'],
    'Ruido': ['Ruido continuo', 'Ruido intermitente'],
    'Problemas de operación': ['No funciona', 'Funciona intermitente'],
    'Obstrucción': ['Obstrucción parcial', 'Obstrucción completa'],
    'Fuga': ['Fuga pequeña', 'Fuga grande'],
    'No gira': ['Atascado', 'Roto'],
    'Vibración': ['Vibración ligera', 'Vibración fuerte'],
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione el sub-síntoma para {selectedSymptom}</h2>
      {subSymptoms[selectedSymptom].map((subSymptom) => (
        <div key={subSymptom} onClick={() => onSubSymptomSelect(subSymptom)} className={styles.option}>
          <p>{subSymptom}</p>
        </div>
      ))}
    </div>
  );
};

export default SubSymptom;

