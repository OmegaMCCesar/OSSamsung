// src/components/BlockSelection.js
import React from 'react';
import styles from '../styles/BlockSelection.module.css';

const BlockSelection = ({ selectedEquipment, onBlockSelect }) => {
  const blocks = {
    Refrigerador: [
      {name:'4C09-EVAPORATOR COVER SERVICE BOLETIN',imgURl:'https://images.samsung.com/is/image/samsung/p6pim/africa_pt/rt31cg5421s9ut/gallery/africa-pt-top-mount-freezer-spacemax-rt31cg5421s9ut-537755516?$650_519_PNG$'},{name:'4C09-EVAPORATOR COVER',imgURl:'https://soldi.mx/wp-content/uploads/2023/10/DA97-13525K-1-800x800.jpeg'},{name:'4B01-COMPRESSOR',imgURl:'https://http2.mlstatic.com/D_NQ_NP_806471-MLM50147135319_052022-F.jpg'},{name:'4A01-MAIN PCB',imgURl:'https://http2.mlstatic.com/D_NQ_NP_628578-MLA70376150013_072023-O.webp'},{name:'4A02-PANEL(DISPLAY) PCB',imgURl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9UwFUGtewrZNGaMZrvQLKQC0zMnaa1tw5o6DqnnXQrJU5vRkIYigce8ds9gURvZ34Qg&usqp=CAU'},{name:'AB03-RELAY PTC',imgURl:'https://m.media-amazon.com/images/I/61J8mlQ3E7L._AC_SX679_.jpg'},{name:'4B04-COMPRESSOR FAN MOTOR(CIRCUIT MOTOR)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_747040-MLM43416977980_092020-O.webp'},{name:'4B05-CONDENSER',imgURl:'https://http2.mlstatic.com/D_NQ_NP_2X_778399-MLB72601543561_102023-F.webp'},{name:'4C05-EVAPORATOR',imgURl:'https://frioimportperu.com/wp-content/uploads/EVAPORADOR-SAMSUNG.webp'},{name:'4B09-GAS LEAKAGE',imgURl:'https://cierreods.vercel.app/fugas.png'},{name:'4C08-AMBIENT SENSOR(ELECTRONIC)',imgURl:'https://tse3.mm.bing.net/th?id=OIP.jwzeKDSTFGD2xKM8Mq9BwQHaHa&pid=Api&P=0&h=180'},{name:'BR13-WATER VALVE(ICE/WATER)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_953174-MLB53140702635_012023-O.webp'},{name:'BR07-ICE MAKER',imgURl:'https://cierreods.vercel.app/ICEMAKER.png'},{name:'FAUNA NOCIVA',imgURl:'https://img3.wikia.nocookie.net/__cb20100602004542/unidadvigrupoa/es/images/8/8f/Fauna_nociva.jpg'
    }],
    Lavadora: [{name:'5A01-PCB ASS,Y(MAIN)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_2X_837522-MLM45404329269_032021-F.webp'},{name:'5A02-PCB ASS,Y(SUB)',imgURl:'https://m.media-amazon.com/images/I/71mQQ3L2cwL._AC_SX679_.jpg'},{name:'5B01-ASSY-DOOR',imgURl:'https://i.ebayimg.com/images/g/W8YAAOSwv9hm8cJF/s-l1600.webp'},{name:'5B05-DOOR-LOOK S/W',imgURl:'https://http2.mlstatic.com/D_NQ_NP_929132-MLC53985266609_022023-O.webp'},{name:'5C02-WATER-VALVE',imgURl:'https://http2.mlstatic.com/D_NQ_NP_805348-MCO41128152797_032020-O.webp'},{name:'5C03-WATER LEVEL SENSOR',imgURl:'https://cdnx.jumpseller.com/centrales-de-repuestos/image/17240703/resize/1200/1200?1625086794'},{name:'5C04-HOSE DRAWER',imgURl:'https://tse4.mm.bing.net/th?id=OIP.sudGRZmX1H1GdcV3Bff-dAAAAA&pid=Api&P=0&h=180'},{name:'5D01-PUMP MOTOR',imgURl:'https://http2.mlstatic.com/D_NQ_NP_995068-MLM42492238259_072020-F.jpg'},{name:'5D02-DRAIN MOTOR(AUTO)',imgURl:'https://www.distribuidorarefrigeracion.co/wp-content/uploads/2020/04/Motor-Drain-Lavadora-SAMSUNG-COOLPARTS-2048x1536.jpg'},{name:'5D03-HOSE-DRAIN',imgURl:'https://tse4.mm.bing.net/th?id=OIP.vHORdgXAV6x_yuQJc-1tLAAAAA&pid=Api&P=0&w=300&h=300'},{name:'5E04-MOTOR ',imgURl:'https://i.ebayimg.com/images/g/nFkAAOSwW1VnKnDP/s-l1600.webp'},{name:'5E07-PULSATOR',imgURl:'https://appliancepartsonline.co.za/new/wp-content/uploads/2020/04/0004876_300.jpeg'},{name:'5E11-DAMPER',imgURl:'https://http2.mlstatic.com/D_NQ_NP_631902-MLM73183859212_122023-O.webp'},],
    Estufa: [{name:'select',imgURl:'https://cdn.homedepot.com.mx/productos/198984/198984-za1.jpg'}],
    Lavasecadora: [{name:'5A01-PCB ASS,Y(MAIN)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_2X_837522-MLM45404329269_032021-F.webp'},{name:'5A02-PCB ASS,Y(SUB)',imgURl:'https://m.media-amazon.com/images/I/71mQQ3L2cwL._AC_SX679_.jpg'},{name:'5B01-ASSY-DOOR',imgURl:'https://www.relemat.es/21983-thickbox_default/puerta-completa-lavadora-bosch-704288.jpg'},{name:'5B05-DOOR-LOOK S/W',imgURl:'https://http2.mlstatic.com/D_NQ_NP_882513-MLM49671921239_042022-O.webp'},{name:'5C02-WATER-VALVE',imgURl:'https://http2.mlstatic.com/D_NQ_NP_805348-MCO41128152797_032020-O.webp'},{name:'5C03-WATER LEVEL SENSOR',imgURl:'https://cdnx.jumpseller.com/centrales-de-repuestos/image/17240703/resize/1200/1200?1625086794'},{name:'5C04-HOSE DRAWER',imgURl:'https://tse4.mm.bing.net/th?id=OIP.sudGRZmX1H1GdcV3Bff-dAAAAA&pid=Api&P=0&h=180'},{name:'5D01-PUMP MOTOR',imgURl:'https://http2.mlstatic.com/D_NQ_NP_995068-MLM42492238259_072020-F.jpg'},{name:'5D03-HOSE-DRAIN',imgURl:'https://tse4.mm.bing.net/th?id=OIP.vHORdgXAV6x_yuQJc-1tLAAAAA&pid=Api&P=0&w=300&h=300'},{name:'5E04-MOTOR',imgURl:'https://http2.mlstatic.com/motor-completo-lavadora-samsung-wd7102rbw-wd7122ckc-wd9102rn-D_NQ_NP_881114-MLB25747770042_072017-F.jpg'},{name:'5E11-DAMPER ',imgURl:'https://s.alicdn.com/@sc04/kf/Hcb9fd85906d741cc8b5c5dfd177b370dP.jpg_720x720q50.jpg'},{name:'5F03-MOTOR-FAN',imgURl:'https://http2.mlstatic.com/D_NQ_NP_866527-MLM74061363097_012024-O.webp'},{name:'5F07-HEATER-DRY',imgURl:'https://www.todorepuestoselectro.com/image/cache/data/OKJMLM/CHCHU/HISENSE2/CHUCHI/TORMENTA/LOL/OYRI/MIELE/CARPETA/GOMA/MANDOS01/dada/JUEGO/BUIT/NUEVA/NUEVO/JESUS/FABRICADOR/LANZA/FILTER/MARCO/CANDICE/NEW/ROTOR/INTELI/MICA/CAMPO/PI%C3%91A/RESISTENCIA-SECADORA-SAMSUNG1-1000x1000.jpg'}],
    Secadora: [{name:'5A01-PCB ASS,Y(MAIN)',imgURl:'https://http2.mlstatic.com/D_NQ_NP_2X_783108-MLA71521919419_092023-F.webp'},{name:'5A02-PCB ASS,Y(SUB)',imgURl:'https://m.media-amazon.com/images/I/71mQQ3L2cwL._AC_SX679_.jpg'},{name:'5B01-ASSY-DOOR',imgURl:'https://cdn.homedepot.com.mx/productos/143823/143823-za2.jpg'},{name:'5B05-DOOR-LOOK S/W',imgURl:'https://http2.mlstatic.com/D_NQ_NP_867603-MLM72627626861_112023-O.webp'},{name:'5E04-MOTOR(m)',imgURl:'https://i.ebayimg.com/images/g/lK8AAOSwCHdiaub3/s-l1600.webp'}]
  };


  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de código para</h2>
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

