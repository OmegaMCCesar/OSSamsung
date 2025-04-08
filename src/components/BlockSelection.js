// src/components/BlockSelection.js
import React, {useState} from 'react';
import styles from '../styles/BlockSelection.module.css';
import data from '../data/data';
import equips from '../data/equipmentOptions';
import ListaPartes from './ListaPartes';




const BlockSelection = ({ selectedEquipment, onBlockSelect }) => {

  const [active, setActive] = useState(false);
  const blocks = data()[selectedEquipment] || [];
  const equipmentOption = equips();
  
  
  const tipos = equipmentOption.find((item) => item.name === selectedEquipment);
  var tipo = tipos.types[0];
  if (tipo === 'laundry') {
    tipo = 'lavasecadoras';
  }
  
  return active ? (<div>
    <button onClick={() => setActive(!active)}>regresar a selecion a cierres</button>
     <ListaPartes tipo={tipo} />
  </div>) : (

    <div className={styles.container}>
      <button onClick={() => setActive(!active)}>Información sobre el funcionamiento</button>
      <h2>Seleccione el bloque de código<br/><strong className={styles.subText}>(Pieza remplazada por tecnicó)</strong> </h2>
      <p>En el caso de tener mas de una refaccion usada en la misma ODS, cerraremos con el bloque (pieza) de mayor importancia.<br />Por ejemplo, si tenmos un caso donde cambiamos PCB Main y Pump Motor, la pieza de mayor rango es PCB.</p>
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


