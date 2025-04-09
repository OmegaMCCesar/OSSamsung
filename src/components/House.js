import React, { useState, /* useEffect */ } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/House.module.css';
import equips from '../data/equipmentOptions';
import { useAuth } from '../contexts/AuthContext';
/* import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../configs/firebase' */
/* import { useSerialNumber } from '../contexts/SerialNumberContext'; // Importar el contexto de SerialNumber */
/* import { validarGarantia } from '../utils/validarGarantia'; */





const Home = ({ onSelect }) => {

  const { user } = useAuth();
/*   const { serialNumber, setSerialNumber } = useSerialNumber(); */

  const equipmentOption = equips();
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
/*   const [serialExists, setSerialExists] = useState(null);
  const [garantiaMensaje, setGarantiaMensaje] = useState('');
 */

  const filteredOptions = equipmentOption.filter((equipment) => {
    const matchesType = selectedType ? equipment.types.includes(selectedType) : true;
    const matchesName = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModels = equipment.models ? equipment.models.some(model => model.toLowerCase().includes(searchTerm.toLowerCase())) : false;
    return matchesType && (matchesName || matchesModels);
  });

  /* const handleSerialNumberCheck = async (serialNumber) => {
    if (!serialNumber.trim()) {
      setSerialExists(null);
      setGarantiaMensaje('');
      return;
    }
  
    const docRef = doc(db, 'serialNumbers', serialNumber);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      setSerialExists(true);
    } else {
      await setDoc(docRef, { createdAt: new Date() });
      setSerialExists(false);
    }

    const { mensaje } = validarGarantia(serialNumber);
    setGarantiaMensaje(mensaje);
  }; */


 /*  useEffect(() => {
    if (serialNumber.length === 15) {
      handleSerialNumberCheck(serialNumber);
    } else {
      setSerialExists(null);
      setGarantiaMensaje('');
    }
  }, [serialNumber]); 

  const lengthSerial = serialNumber.length;
console.log(serialNumber); */

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      {/* <p>Antes de comenzar , introduzca el numero de serie</p>
      <input type="text" placeholder="Número de serie" className={styles.search} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value.toUpperCase())} />
      {serialExists === true && (
          <p className={styles.success}>✅ Número de serie ya registrado. Puede continuar con el cierre.</p>
        )}
        {serialExists === false && (
          <p className={styles.info}>🔄 Número de serie registrado por primera vez. Puede continuar.</p>
        )}
      <p>{serialNumber}</p>
      {garantiaMensaje && (
          <p className={garantiaMensaje.includes('fuera') ? styles.error : styles.success}>
            {garantiaMensaje}
          </p>
        )} */}
      <div className={styles.cabezalTitle}>
        <h2 className={styles.cabezalh2} >INGENIERIA LINEA BLANCA</h2>
        <h2>Seleccione un tipo de equipo</h2>
        <h2  className={styles.cabezalh2}>TECHNICAL SUPPORT SEM-S</h2>
        </div>
        <div className={styles.controls}>
          <select className={styles.filter} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Todos</option>
            <option value="refrigeradores">Refrigeradores</option>
            <option value="lavadoras">Lavadoras</option>
            <option value="secadoras">Secadoras</option>
            <option value="lavasecadoras">Lavasecadoras</option>
            <option value="estufas">Estufas</option>
            <option value="hornosMicroondas">Microondas</option>
            <option value="laundry">Laundry</option>
            <option value="lavavajillas">Lavavajillas</option>
          </select>
          <input type="text" placeholder="Buscar modelo válido" className={styles.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className={styles.buttonContainer}>
          {user ? <>
            <Link to='/add' className={styles.button}>Añadir</Link>
          </>: null}
          <Link className={styles.button}  to='/3.0' >Cierres 2.0</Link>
          <Link to='/búzon' className={styles.button}>Búzon</Link>
          <Link to='/' className={styles.button}>Volver a Inicio</Link>
        </div>
      </div>
      
      {/* lengthSerial === 15 && */ <div className={styles.grid}>
        {filteredOptions.map((equipment) => (
          <div key={equipment.name} className={styles.card} onClick={() => onSelect(equipment.name)}>
            <div className={styles.containerCard}>
            <img className={styles.image} src={equipment.imgURl} alt={equipment.name} />
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default Home;