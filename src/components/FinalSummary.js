// src/components/FinalSummary.js
import React from 'react';
import styles from '../styles/FinalSummary.module.css';

const FinalSummary = ({ selections, onBackToHome }) => {
  return (
    <div className={styles.container}>
      <h2>Resumen Final de Selección</h2>
      <ul className={styles.summaryList}>
        <li><strong>Equipo seleccionado:</strong> {selections.equipment}</li>
        <li><strong>Bloque de código seleccionado:</strong> {selections.block}</li>
        <li><strong>Bloque de síntoma seleccionado:</strong> {selections.symptomBlock}</li>
        <li><strong>Sub-síntoma seleccionado:</strong> {selections.subSymptom}</li>
        <li><strong>Código de reparación seleccionado:</strong> {selections.repairCode}</li>
        <li><strong>Opción final de reparación:</strong> {selections.finalRepair}</li>
      </ul>
      <button className={styles.backButton} onClick={onBackToHome}>Volver al Inicio</button>
    </div>
  );
};

export default FinalSummary;
