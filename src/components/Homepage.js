import { Link } from 'react-router-dom';
import styles from '../styles/Homepage.module.css';
import { useState } from 'react';
/* import { db } from '../configs/firebase';
import { collectionGroup, getDocs, where, query} from 'firebase/firestore'; */


const Homepage = () => {

  const [loginInp, setLoginInp] = useState('');

/* const getInfo = async () => {
  

  const infoRef = collectionGroup(db, "bloques");
  const resonseFirebs = await getDocs(infoRef);
    
     resonseFirebs.forEach((linea) => {
      console.log(linea.data());
      
     })
  const filterCategori = query(collectionGroup(db,"bloques"),where("category", "==", "REF"));
  const querySnapshot = await getDocs(filterCategori);
     

     querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      
     })
}

getInfo() */
console.log(loginInp);

  
  return (
    
    <div className={styles.container}>
      <h1 className={styles.h1}>Apoyo de cierre Órdenes de Servicio</h1>
      <input value={loginInp} onChange={(e) => setLoginInp(e.target.value)}></input>
      {loginInp === 'loginC' && <Link to="/login" className={styles.login}>Login</Link>}
      <Link to="/Bridge" className={styles.comenzar}>Comenzar</Link>
    </div>
  );
};

export default Homepage;
