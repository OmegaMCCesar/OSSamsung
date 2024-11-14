// src/components/BlockSelection.js
import React from 'react';
import styles from '../styles/BlockSelection.module.css';

const BlockSelection = ({ selectedEquipment, onBlockSelect }) => {
  const blocks = {
    Refrigerador: [{name:'4B01-COMPRESSOR',imgURl:'https://http2.mlstatic.com/D_NQ_NP_806471-MLM50147135319_052022-F.jpg'},{name:'4A01-MAIN PCB',imgURl:'https://http2.mlstatic.com/D_NQ_NP_628578-MLA70376150013_072023-O.webp'},{name:'4A02-PANEL(DISPLAY) PCB',imgURl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UwFUGtewrZNGaMZrvQLKQC0zMnaa1tw5o6DqnnXQrJU5vRkIYigce8ds9gURvZ34Qg&usqp=CAU'},{name:'AB03-RELAY PTC',imgURl:'https://m.media-amazon.com/images/I/61J8mlQ3E7L._AC_SX679_.jpg'},{name:'4B04-COMPRESSOR FAN MOTOR(CIRCUIT MOTOR)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_747040-MLM43416977980_092020-O.webp'},{name:'4B05-CONDENSER',imgURl:'https://http2.mlstatic.com/D_NQ_NP_2X_778399-MLB72601543561_102023-F.webp'},{name:'4C05-EVAPORATOR',imgURl:'https://frioimportperu.com/wp-content/uploads/EVAPORADOR-SAMSUNG.webp'},{name:'4B09-GAS LEAKAGE',imgURl:'https://cierreods.vercel.app/fugas.png'},{name:'4C08-AMBIENT SENSOR(ELECTRONIC)',imgURl:'https://tse3.mm.bing.net/th?id=OIP.jwzeKDSTFGD2xKM8Mq9BwQHaHa&pid=Api&P=0&h=180'},{name:'BR13-WATER VALVE(ICE/WATER)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_953174-MLB53140702635_012023-O.webp'},{name:'BR07-ICE MAKER',imgURl:'https://cierreods.vercel.app/ICEMAKER.png'},{name:'AR41-HOT PIPE',imgURl:'https://images.samsung.com/is/image/samsung/assets/in/support/home-appliances/why-does-the-sides-the-outside-cabinet-and-door-gasket-occasionally-get-hot-to-touch/REF_006_IN_0030.jpg'},{name:'4F05-REFRIGERATOR DOOR',imgURl:'https://cdn.homedepot.com.mx/productos/816026/816026-d.jpg'},{name:'FAUNA NOCIVA',imgURl:'https://img3.wikia.nocookie.net/__cb20100602004542/unidadvigrupoa/es/images/8/8f/Fauna_nociva.jpg'
    }],
    Lavadora: ['Motor', 'Transmisión'],
    Estufa: ['Encendido', 'Quemador'],
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de código para {selectedEquipment}</h2>
      <div className={styles.containerBlock}>
      {blocks[selectedEquipment].map((block) => (
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

