// src/components/PartSelection.js
import React from 'react';
import styles from '../styles/PartSelection.module.css'

const PartSelection = ({ selectedEquipment, onPartSelect }) => {
  const parts = {
    Refrigerador: ['4B01-COMPRESSOR', '4A01-MAIN PCB', '4A02-PANEL(DISPALY) PCB','AB03-RELAY PTC', '4B04-COMPRESSOR FAN MOTOR(CIRCUIT MOTOR)'],
    Lavadora: ['Bomba', 'Motor'],
    Estufa: ['Encendido', 'Válvula'],
  };

  return (
    <div className={styles.partSelectionContainer} >
      <h2>Seleccione la parte de la {selectedEquipment}</h2>
      <div className={styles.symptomsContainer } >
      {parts[selectedEquipment].map((part) => (
        <div key={part} className={styles.part} onClick={() => onPartSelect(part)}>
          <p className={styles.partName} >{part}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default PartSelection;


