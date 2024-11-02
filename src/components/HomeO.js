// src/components/Home.js
import React from 'react';
import styles from '../styles/Home.module.css'

const HomeO = ({ onSelect }) => {
  const equipmentOptions = [{name:'Refrigerador',urlImg:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609536330l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'}, {name:'Lavadora',urlImg:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609270557l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'}, {name:'Estufa',urlImg:'https://cdn1.coppel.com/images/catalog/pm/6450793-1.jpg'}];

  return (
    <div className={styles.homeContainer} >
      <h1>Seleccione el equipo</h1>
      <div className={styles.principalContainer}  >
      {equipmentOptions.map((equipment) => (
        <div  key={equipment.name} onClick={() => onSelect(equipment.name)} >  
          <div className={styles.equipo} >
           <img className={styles.image} src={equipment.urlImg} alt='imgref'/>
              <h2 className={styles.equipoName} >
                {equipment.name}</h2>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default HomeO;