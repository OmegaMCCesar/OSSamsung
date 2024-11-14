// src/components/SubSymptom.js
import React from 'react';
import styles from '../styles/SubSymptom.module.css';


const SubSymptom = ({ selectedSymptom, onSubSymptomSelect }) => {
  const subSymptoms = {
    'FAUNA ENCONTRADA EN EQUIPO':[],
    'SRC015-RUIDO':['HK1-RUIDO DE MOTOR'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(CONDENSER)':['HE2-ENFRIAMIENTO POBRE(CONDENSER)'],
    'SRC021-CALENTAMIENTO/REFRIGERACION':['HE2-ENFRIAMIENTO POBRE'],
    'SRC022-FUGA/FUGA**':['HE9-FUGA DE GAS**'],
    'SRC022-FUGA/FUGA':['HE9-FUGA DE GAS'],
    'SRC022-FUGA/FUGA(GAS LEAKAGE)':['HE9-FUGA DE GAS(GAS LEAKAGE)'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(RT31)':['HE3-ENFRIAMIENTO EXCESIVO(RT31)'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(SENSOR ELECTRONIC)':['HE2-ENFRIAMINETO POBRE(SENSOR ELECTRONIC)'],
    'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR)':['HA1-NO ENCIENDE(COMPRESSOR)'],
    'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR*)':['HA1-NO ENCIENDE(COMPRESSOR*)'],
    'SRC012-PROBLEMAS DE ENCENDIDO(PCB DISPLAY)':['HA1-NO ENCIENDE'],
    'SRC013-PROBLEMAS DE OPERACION(COMPRESSOR)':['HLC-NO FUNCIONA EL COMPRESSOR','HL1-ENCIENDE, PERO NO OPERA(COMPRESSOR)','HL2-OPERACION INTERMITENTE(COMPRESSOR)'],
    'SRC013-PROBLEMAS DE OPERACION(PCB)':['HL1-ENCIENDE, PERO NO OPERA(PCB)','HL2-OPERACION INTERMITENTE(PCB)'],
    'SRC013-PROBLEMAS DE OPERACION(IM)':['HL1-ENCIENDE, PERO NO OPERA(IM)'],
    'SRC019-PROBLEMAS DE CONEXION':['HXB-CONEXION DE CABLE INCORRECTA'],
    'SRC029-PROVEDOR DE AGUA':['HG2-SIN SUMINISTRO DE AGUA'],
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
          <button >{subSymptom}</button>
        </div>
      ))}
    </div>
  );
};

export default SubSymptom;

