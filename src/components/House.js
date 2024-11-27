// src/components/Home.js
import React from 'react';
import styles from '../styles/House.module.css'

const House = ({ onSelect }) => {
  const equipmentOptions = [{name:'Refrigerador',imgURl:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609536330l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'}, {name:'Lavadora',imgURl:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609218772l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'}, {name:'Estufa',imgURl:'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981004685l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'}];





  return (
    <div className={styles.container}>
      <h2>Seleccione un tipo de equipo</h2>
      <div className={styles.subContainer}>
      {equipmentOptions.map((equipment) => (
        <div key={equipment.name} onClick={() => onSelect(equipment.name)} className={styles.option}>
          <img className={styles.imgU} src={equipment.imgURl}  alt={equipment.name} />
          <p>{equipment.name}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default House;
