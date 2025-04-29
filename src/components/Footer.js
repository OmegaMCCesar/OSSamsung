import '../styles/Footer.module.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Footer = () => {
   return (
    <footer>
    <p>&copy; {new Date().getFullYear()} LC. Todos los derechos reservados.</p>
    <p>Desarrollado por Luis César Muñoz Cervantes</p>
    <p>Contacto: 56 26 88 57 26 | luiscesar.munoz.cervantes.upiit@gmail.com</p>
    <p><Link to="/legal" className="text-blue-400 hover:underline">Aviso legal</Link></p>
  </footer>
   );
}

export default Footer;