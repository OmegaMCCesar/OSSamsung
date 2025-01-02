// src/components/Home.js
import React, { useState } from 'react';
import styles from '../styles/House.module.css';

const House = ({ onSelect }) => {
  const equipmentOptions = [
    { name: 'TCombo', imgURl: 'https://cdn.homedepot.com.mx/productos/224225/224225-d.jpg', types: ['lavasecadoras'] },
    { name: 'RefrigeradorD', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609014719l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'Bespoke', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00750940183015l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'RefFD', imgURl: 'https://cdn.homedepot.com.mx/productos/150621/150621-za1.jpg', types: ['refrigeradores'] },
    { name: 'RefrigeradorBespoke', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981024523l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'FrontalWF', imgURl: 'https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dwf6750753/images/38499949/large/38499949_x1.jpg', types: ['lavadoras'] },
    { name: 'LavadoraWT', imgURl: 'https://i5.walmartimages.com/asr/53cda4a7-9c1f-4cfe-b0eb-3c4c9ed49108.6b2874d1ecf3cb150492f8092f90aec8.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavadoras'] },
    { name: 'Lavadora', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609218772l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavadoras'] },
    { name: 'Estufa', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981004685l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['estufas'] },
    { name: 'Lavasecadora', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981022018l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavasecadoras'] },
    { name: 'Secadora', imgURl: 'https://i5.walmartimages.com/asr/ff1b7876-648e-48a8-b8b2-944b0eca0d4f.327452761c0030d72b7b80984eacf48d.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['secadoras'] },
    { name: 'Microondas', imgURl: 'https://petenattiar.vtexassets.com/arquivos/ids/207973/HORNO-SAMSUNG-MG23-CON-GRILL-23LTS-SILVER.jpg?v=637932513797200000', types: ['microondas'] },
    { name: 'MicroondasSinGrill', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/980014578l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['microondas'] },
  ];

  // Estado para el tipo seleccionado
  const [selectedType, setSelectedType] = useState('');

  // Filtrar opciones según el tipo seleccionado
  const filteredOptions = selectedType
    ? equipmentOptions.filter((equipment) => equipment.types.includes(selectedType))
    : equipmentOptions;

  return (
    <div className={styles.container}>
      <h2>Seleccione un tipo de equipo</h2>
      
      {/* Selector para filtrar */}
      <select
        className={styles.filter}
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="refrigeradores">Refrigeradores</option>
        <option value="lavadoras">Lavadoras</option>
        <option value="secadoras">Secadoras</option>
        <option value="lavasecadoras">Lavasecadoras</option>
        <option value="estufas">Estufas</option>
        <option value="microondas">Microondas</option>
      </select>

      <div className={styles.subContainer}>
        {filteredOptions.map((equipment) => (
          <div key={equipment.name} onClick={() => onSelect(equipment.name)} className={styles.option}>
            <img className={styles.imgU} src={equipment.imgURl} alt={equipment.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default House;

