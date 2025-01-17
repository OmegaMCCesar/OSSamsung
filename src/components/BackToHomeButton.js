// src/components/BackToHomeButton.js
import styles from '../styles/BackToHomeButton.module.css'
import React from 'react';

const BackToHomeButton = ({ onBackToHome }) => {
  return (
    <button className={styles.backButton} onClick={onBackToHome}>Volver a selección de producto</button>
  );
};

export default BackToHomeButton;


