import { Link } from 'react-router-dom';
import styles from '../styles/Homepage.module.css';
import { useState } from 'react';


const Homepage = () => {

  const [loginInp, setLoginInp] = useState('');



  
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
