// src/components/BackToHomeButton.js
import styles from '../styles/BackToHomeButton.module.css'
import React from 'react';

const BackToHomeButton = ({ onBackToHome }) => {
  return (
    <button className={styles.backButton} onClick={onBackToHome}>Volver al Inicio</button>
  );
};

export default BackToHomeButton;


