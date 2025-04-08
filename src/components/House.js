import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/House.module.css';
import equips from '../data/equipmentOptions';
import { useAuth } from '../contexts/AuthContext';


const Home = ({ onSelect }) => {

  const { user } = useAuth();

  const equipmentOption = equips();
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const filteredOptions = equipmentOption.filter((equipment) => {
    const matchesType = selectedType ? equipment.types.includes(selectedType) : true;
    const matchesName = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModels = equipment.models ? equipment.models.some(model => model.toLowerCase().includes(searchTerm.toLowerCase())) : false;
    return matchesType && (matchesName || matchesModels);
  });

  const lengthSerial = serialNumber.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
      {/* <p>Antes de comenzar , introdusca el numero de serie</p>
      <input type="text" placeholder="Número de serie" className={styles.search} value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
      <p>{serialNumber}</p> */}
        <h2>Seleccione un tipo de equipo</h2>
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