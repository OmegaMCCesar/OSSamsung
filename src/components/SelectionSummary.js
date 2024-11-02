// src/components/SelectionSummary.js
import React from 'react';

const SelectionSummary = ({ selections }) => {
  return (
    <div>
      <h2>Resumen de Selecciones</h2>
      <p>Equipo: {selections.equipment || 'No seleccionado'}</p>
      <p>Parte: {selections.part || 'No seleccionado'}</p>
      <p>Síntoma: {selections.symptom || 'No seleccionado'}</p>
      <p>Código Intermedio: {selections.interim || 'No seleccionado'}</p>
      <p>Código de Reparación: {selections.repair || 'No seleccionado'}</p>
      <p>Opción Final: {selections.final || 'No seleccionado'}</p>
    </div>
  );
};

export default SelectionSummary;



