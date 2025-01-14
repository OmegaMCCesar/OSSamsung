// src/components/Home.js
import React, { useState } from 'react';
import styles from '../styles/House.module.css';
import { Link } from 'react-router-dom';

const House = ({ onSelect }) => {
  
  const equipmentOptions = [
    { name: 'LavadoraWA', imgURl:'https://images.samsung.com/is/image/samsung/mx-top-loader-wa17j6730lv-wa17j6730lv-ax-frontblack-63609451?$624_624_PNG$', types: ['lavadoras'] , models: ['WADEE', 'WAty']},
    { name: 'TCombo', imgURl: 'https://cdn.homedepot.com.mx/productos/224225/224225-d.jpg', types: ['lavasecadoras'] },
    { name: 'RefrigeradorRR', imgURl:'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202408/29/00104721227611____19__1200x1200.jpg', types: ['refrigeradores'] },
    { name: 'RefrigeradorD', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609014719l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'], models: ['SR20'] },
    { name: 'Bespoke', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00750940183015l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'RefFD', imgURl: 'https://cdn.homedepot.com.mx/productos/150621/150621-za1.jpg', types: ['refrigeradores'] },
    { name: 'RefrigeradorBespoke', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981024523l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'CentroBespoke', imgURl:'https://vivelaera.com/wp-content/uploads/2024/05/WH22DBH570GV_4.jpg', types: ['laundry',] },
    { name: 'FrontalWF', imgURl: 'https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dwf6750753/images/38499949/large/38499949_x1.jpg', types: ['lavadoras'] },
    { name: 'LavadoraWT', imgURl: 'https://i5.walmartimages.com/asr/53cda4a7-9c1f-4cfe-b0eb-3c4c9ed49108.6b2874d1ecf3cb150492f8092f90aec8.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavadoras'] },
    { name: 'Lavadora', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609218772l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavadoras'] },
    { name: 'Estufa', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981004685l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['estufas'] },
    { name: 'Lavasecadora', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981022018l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavasecadoras'] },
    { name: 'SecadoraD', imgURl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/dvg24bb8900dax/gallery/mx-dv8900b-dvg24bb8900dax-534895211?$684_547_PNG$', types: ['secadoras'] },
    { name: 'Secadora', imgURl: 'https://i5.walmartimages.com/asr/ff1b7876-648e-48a8-b8b2-944b0eca0d4f.327452761c0030d72b7b80984eacf48d.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['secadoras'] },
    { name: 'EstufaS', imgURl: 'https://http2.mlstatic.com/D_NQ_NP_720146-MLA48680778505_122021-O.webp', types: ['estufas'] }, 
    { name: 'Microondas', imgURl: 'https://petenattiar.vtexassets.com/arquivos/ids/207973/HORNO-SAMSUNG-MG23-CON-GRILL-23LTS-SILVER.jpg?v=637932513797200000', types: ['microondas'] },
    { name: 'MicroondasSinGrill', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/980014578l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['microondas'] },
  ];

  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = equipmentOptions.filter((equipment) => {
    const matchesType = selectedType ? equipment.types.includes(selectedType) : true;
    const matchesName = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModels = equipment.models ? equipment.models.some((model) => model.toLowerCase().includes(searchTerm.toLowerCase())) : false;
    return matchesType && (matchesName || matchesModels);
  });

  return (
    <div className={styles.container}>
      <div className={styles.subContainerHead} >
        <input 
          type="text" 
          placeholder="Buscar modelo válido" 
          className={styles.search} 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <h2>Seleccione un tipo de equipo</h2>
        <Link to='/' className={styles.buttonHomePage}>Homepage</Link>
      </div>
      
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
        <option value="laundry">Laundry</option>
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


/*

const equipmentOptions = [
    { name: 'LavadoraWA', imgURl:'https://images.samsung.com/is/image/samsung/mx-top-loader-wa17j6730lv-wa17j6730lv-ax-frontblack-63609451?$624_624_PNG$', types: ['lavadoras'] , models: ['WADEE', 'WAty']},
    { name: 'TCombo', imgURl: 'https://cdn.homedepot.com.mx/productos/224225/224225-d.jpg', types: ['lavasecadoras'] },
    { name: 'RefrigeradorRR', imgURl:'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202408/29/00104721227611____19__1200x1200.jpg', types: ['refrigeradores'] },
    { name: 'RefrigeradorD', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609014719l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'Bespoke', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00750940183015l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'RefFD', imgURl: 'https://cdn.homedepot.com.mx/productos/150621/150621-za1.jpg', types: ['refrigeradores'] },
    { name: 'RefrigeradorBespoke', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981024523l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['refrigeradores'] },
    { name: 'CentroBespoke', imgURl:'https://vivelaera.com/wp-content/uploads/2024/05/WH22DBH570GV_4.jpg', types: ['laundry',] },
    { name: 'FrontalWF', imgURl: 'https://www.elpalaciodehierro.com/on/demandware.static/-/Sites-palacio-master-catalog/default/dwf6750753/images/38499949/large/38499949_x1.jpg', types: ['lavadoras'] },
    { name: 'LavadoraWT', imgURl: 'https://i5.walmartimages.com/asr/53cda4a7-9c1f-4cfe-b0eb-3c4c9ed49108.6b2874d1ecf3cb150492f8092f90aec8.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavadoras'] },
    { name: 'Lavadora', imgURl: 'https://i5-mx.walmartimages.com/mg/gm/1p/images/product-images/img_large/00880609218772l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavadoras'] },
    { name: 'Estufa', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981004685l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['estufas'] },
    { name: 'Lavasecadora', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/981022018l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['lavasecadoras'] },
    { name: 'SecadoraD', imgURl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/dvg24bb8900dax/gallery/mx-dv8900b-dvg24bb8900dax-534895211?$684_547_PNG$', types: ['secadoras'] },
    { name: 'Secadora', imgURl: 'https://i5.walmartimages.com/asr/ff1b7876-648e-48a8-b8b2-944b0eca0d4f.327452761c0030d72b7b80984eacf48d.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['secadoras'] },
    { name: 'EstufaS', imgURl: 'https://http2.mlstatic.com/D_NQ_NP_720146-MLA48680778505_122021-O.webp', types: ['estufas'] }, 
    { name: 'Microondas', imgURl: 'https://petenattiar.vtexassets.com/arquivos/ids/207973/HORNO-SAMSUNG-MG23-CON-GRILL-23LTS-SILVER.jpg?v=637932513797200000', types: ['microondas'] },
    { name: 'MicroondasSinGrill', imgURl: 'https://i5-mx.walmartimages.com/samsmx/images/product-images/img_large/980014578l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', types: ['microondas'] },
  ];


*/


