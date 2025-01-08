// src/components/BlockSelection.js
import React from 'react';
import styles from '../styles/BlockSelection.module.css';
import data from '../data/data';


const BlockSelection = ({ selectedEquipment, onBlockSelect }) => {

  const datas = data();

  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de código para</h2>
      <div className={styles.containerBlock}>
      {datas[selectedEquipment].map((block) => (
        <div key={block.name} onClick={() => onBlockSelect(block.name)} className={styles.option}>
          <img src={block.imgURl} alt={block.name}/>
          <p>{block.name}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default BlockSelection;

