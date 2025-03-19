// src/components/BlockSelection.js
import React from 'react';
import styles from '../styles/BlockSelection.module.css';
import data from '../data/data';

const BlockSelection = ({ selectedEquipment, onBlockSelect }) => {
  const blocks = data()[selectedEquipment] || [];

  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de código</h2>
      <div className={styles.containerBlock}>
        {blocks.map((block) => (
          <div 
            key={block.name} 
            onClick={() => onBlockSelect(block.name)} 
            className={styles.option}
          >
            <img src={block.imgURl} alt={block.name} className={styles.image} />
            <p className={styles.text}>{block.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockSelection;


