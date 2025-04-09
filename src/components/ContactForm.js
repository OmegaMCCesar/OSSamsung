import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactForm.module.css';
import { Link } from 'react-router-dom';
import ascCodes from '../data/ascCodes';

const validASC = ascCodes(); // Lista de ASC válidos

const ContactForm = () => {
  const form = useRef();
  const [asc, setAsc] = useState('');
  const [isAscValid, setIsAscValid] = useState(true);

  const validateASC = (value) => {
    setAsc(value);
    setIsAscValid(validASC.includes(value));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!isAscValid) {
      alert('El código ASC ingresado no es válido.');
      return;
    }

    emailjs.sendForm('service_hp5g9er', 'template_fw5dsio', form.current, 'OimePa9MbzuM5Lahj')
      .then((result) => {
        alert('Correo enviado correctamente');
        form.current.reset();
        setAsc('');
        setIsAscValid(true);
      }, (error) => {
        alert('Error al enviar el correo: ' + error.text);
      });
  };

  return (
    <>
      <Link to='/Bridge' className={styles.inicio}>Volver a Inicio</Link>
      <form ref={form} onSubmit={sendEmail} className={styles.formContainer}>
        <div className={styles.formField}>
          <label className={styles.label}>Nombre</label>
          <input type="text" name="user_name" className={styles.input} required />
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>ASC</label>
          <input
            type="text"
            name="user_asc"
            className={styles.input}
            value={asc}
            onChange={(e) => validateASC(e.target.value)}
            required
          />
          {!isAscValid && <span className={styles.error}>Código ASC no válido</span>}
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>Correo Electrónico</label>
          <input type="email" name="user_email" className={styles.input} required />
        </div>
        <div className={styles.formField} >
          <label className={styles.label}>Teléfono o Cel</label>
          <input type="tel" name="user_phone" className={styles.input} required />
        </div>
        <div className={styles.formField}>
          <label className={styles.label}>Agrega el producto o duda para código de cierre no encontrado</label>
          <textarea name="message" className={styles.textarea} required />
        </div>
        <input type="submit" value="Enviar" className={styles.button} disabled={!isAscValid} />
      </form>
    </>
  );
};

export default ContactForm;




