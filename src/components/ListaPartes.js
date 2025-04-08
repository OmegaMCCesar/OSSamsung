import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebase';
import styles from '../styles/ListaPartes.module.css';

const ListaPartes = ({ tipo }) => {
  const [partes, setPartes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartes = async () => {
      setLoading(true);
      try {
        // Definimos los nombres de las colecciones para las partes mecánicas y eléctricas
        const mecanicasCollection = collection(db, `partes_${tipo}_mecanicas`);
        const electricasCollection = collection(db, `partes_${tipo}_electricas`);

        // Consultamos ambas colecciones de forma asincrónica
        const [snapshotMecanicas, snapshotElectricas] = await Promise.all([
          getDocs(mecanicasCollection),
          getDocs(electricasCollection),
        ]);

        const dataMecanicas = snapshotMecanicas.docs.map(doc => doc.data());
        const dataElectricas = snapshotElectricas.docs.map(doc => doc.data());

        // Unimos ambos arreglos en uno solo
        setPartes([...dataMecanicas, ...dataElectricas]);
      } catch (error) {
        console.error('Error al obtener las partes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (tipo) {
      fetchPartes();
    }
  }, [tipo]);

  if (loading) return <p className={styles.cargando}>Cargando partes de {tipo}...</p>;

  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Partes de {tipo.charAt(0).toUpperCase() + tipo.slice(1)} Samsung</h1>
      <div className={styles.listaPartes}>
        {partes.map((parte, index) => (
          <div key={index} className={styles.parte}>
            <img src={parte.imagen} alt={parte.nombre} className={styles.imagen} />
            <h2 className={styles.nombre}>{parte.nombre}</h2>
            <p className={styles.funcion}><strong>Función:</strong> {parte.funcion}</p>
            <p className={styles.problemas}><strong>Problemas si falla:</strong></p>
            <ul>
              {parte.problemas.map((problema, i) => <li key={i}>{problema}</li>)}
            </ul>
            <p className={styles.soluciones}><strong>Posibles soluciones:</strong></p>
            <ul>
              {parte.soluciones.map((solucion, i) => <li key={i}>{solucion}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPartes;
