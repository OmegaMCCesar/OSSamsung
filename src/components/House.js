// src/components/Home.js
import React from 'react';
import styles from '../styles/House.module.css'

const House = ({ onSelect }) => {
  const equipmentOptions = [{name:'TCombo',imgURl:'https://cdn.homedepot.com.mx/productos/224225/224225-d.jpg'},{name:'Bespoke',imgURl:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00750940183015l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},{name:'Refrigerador Bespoke',imgURl:'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981024523l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},{name:'Refrigerador',imgURl:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609536330l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},{name:'Frontal WF',imgURl:'https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dwf6750753/images/38499949/large/38499949_x1.jpg'}, {name:'Lavadora',imgURl:'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609218772l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'}, {name:'Estufa',imgURl:'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981004685l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},{name:'Lavasecadora',imgURl:'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981022018l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},{name:'Secadora',imgURl:'https://i5.walmartimages.com/asr/ff1b7876-648e-48a8-b8b2-944b0eca0d4f.327452761c0030d72b7b80984eacf48d.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF'},{name:'Microondas',imgURl:'https://petenattiar.vtexassets.com/arquivos/ids/207973/HORNO-SAMSUNG-MG23-CON-GRILL-23LTS-SILVER.jpg?v=637932513797200000'}];





  return (
    <div className={styles.container}>
      <button className={styles.butt}  onClick={() => alert('')}>Multiline</button>
      <h2>Seleccione un tipo de equipo</h2>
      <div className={styles.subContainer}>
      {equipmentOptions.map((equipment) => (
        <div key={equipment.name} onClick={() => onSelect(equipment.name)} className={styles.option}>
          <img className={styles.imgU} src={equipment.imgURl}  alt={equipment.name} /> 
        </div>
      ))}
      </div>
    </div>
  );
};

export default House;
