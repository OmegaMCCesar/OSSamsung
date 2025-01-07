import { Link } from "react-router-dom";
import styles from "../styles/Homepage.module.css";

const Homepage = () => {
  return (
    <div className={styles.container} >
      <h1  className={styles.h1}>Apoyo de cierre Ordenes de Servicio</h1>
      <Link to="/Bridge" className={styles.comenzar} >Comenzar</Link>
    </div>
  );
};

export default Homepage;