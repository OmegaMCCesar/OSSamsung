// ContactForm.js
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactForm.module.css';
import { Link } from 'react-router-dom';

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_hp5g9er', 'template_fw5dsio', form.current, 'OimePa9MbzuM5Lahj')
      .then((result) => {
          alert('Correo enviado correctamente');
          form.current.reset();
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
        <input type="text" name="user_asc" className={styles.input} required />
      </div>
      <div className={styles.formField}>
        <label className={styles.label}>Correo Electrónico</label>
        <input type="email" name="user_email" className={styles.input} required />
      </div>
      <div className={styles.formField}>
        <label className={styles.label}>Agrega el producto o duda para codigo de cieere no encontrado</label>
        <textarea name="message" className={styles.textarea} required />
      </div>
      <input type="submit" value="Enviar" className={styles.button} />
    </form>
    </>
  );
};

export default ContactForm;



