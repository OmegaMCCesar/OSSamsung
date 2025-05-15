import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactForm.module.css';
import { Link } from 'react-router-dom';
import ascCodes from '../data/ascCodes';

// Assuming ascCodes() returns an array of valid ASCs
const validASC = ascCodes();

const ContactForm = () => {
    const form = useRef();
    const [asc, setAsc] = useState('');
    const [isAscValid, setIsAscValid] = useState(true); // Start as true, validation happens on change/submit

    const validateASC = (value) => {
        setAsc(value);
        // Check validity immediately as user types if value is not empty
        if (value.trim() !== '') {
            setIsAscValid(validASC.includes(value.toUpperCase())); // Validate against uppercase
        } else {
            setIsAscValid(true); // Consider empty field valid until required check on submit
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();

        // Re-validate ASC on submit, especially for empty case if required
        const currentAscValue = form.current.user_asc.value.trim().toUpperCase();
        const finalAscValid = validASC.includes(currentAscValue);
        setIsAscValid(finalAscValid);

        // Also check other required fields if needed (basic browser validation 'required' helps)

        if (!finalAscValid) {
             // Optional: More specific error message or styling if needed
             alert('El código ASC ingresado no es válido.'); // Keep alert for now as per original
             return;
        }

        // Check if all required fields have values (basic check)
        const userName = form.current.user_name.value.trim();
        const userEmail = form.current.user_email.value.trim();
        const userPhone = form.current.user_phone.value.trim();
        const message = form.current.message.value.trim();

         if (!userName || !currentAscValue || !userEmail || !userPhone || !message) {
             alert('Por favor, complete todos los campos obligatorios.');
             // Note: Browser's 'required' attribute handles this visually too
             return;
         }


        emailjs.sendForm('service_hp5g9er', 'template_fw5dsio', form.current, 'OimePa9MbzuM5Lahj')
            .then((result) => {
                alert('Correo enviado correctamente');
                form.current.reset();
                setAsc(''); // Clear ASC state
                setIsAscValid(true); // Reset ASC validation state
            }, (error) => {
                alert('Error al enviar el correo: ' + error.text);
            });
    };

    return (
        <>
            {/* Added a wrapper div for the back link for potential layout adjustments */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                 <Link to='/Bridge' className={styles.inicio}>Volver a Inicio</Link>
            </div>


            <form ref={form} onSubmit={sendEmail} className={styles.formContainer}>
                {/* Added an asterisk (*) to indicate required fields */}
                <div className={styles.formField}>
                    <label className={styles.label}>Nombre *</label>
                    <input type="text" name="user_name" className={styles.input} required />
                </div>
                <div className={styles.formField}>
                    {/* Conditionally add errorState class to input */}
                    <label className={styles.label}>ASC *</label>
                    <input
                        type="text"
                        name="user_asc"
                        className={`${styles.input} ${!isAscValid ? styles.errorState : ''}`}
                        value={asc}
                        onChange={(e) => validateASC(e.target.value)}
                        required
                    />
                    {/* Error message is shown below the input */}
                    {!isAscValid && <span className={styles.error}>Código ASC no válido</span>}
                </div>
                <div className={styles.formField}>
                    <label className={styles.label}>Correo Electrónico *</label>
                    <input type="email" name="user_email" className={styles.input} required />
                </div>
                <div className={styles.formField} >
                    <label className={styles.label}>Teléfono o Cel *</label>
                    <input type="tel" name="user_phone" className={styles.input} required />
                </div>
                <div className={styles.formField}>
                    <label className={styles.label}>Agrega el producto o duda para código de cierre no encontrado *</label>
                    <textarea name="message" className={styles.textarea} required />
                </div>
                {/* Button is disabled if ASC is not valid */}
                <input type="submit" value="Enviar" className={styles.button} disabled={!isAscValid} />
            </form>
        </>
    );
};

export default ContactForm;