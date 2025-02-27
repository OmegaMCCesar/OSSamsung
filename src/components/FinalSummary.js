// src/components/FinalSummary.js
import React from 'react';
import styles from '../styles/FinalSummary.module.css';

const FinalSummary = ({ selections }) => {
  return (
    <div className={styles.container}>
      <h2>Resumen Final de Cierre</h2>
      <ul className={styles.summaryList}>
        <li><strong>Equipo seleccionado:</strong> {selections.equipment}</li>
        <li><strong>Bloque de defecto:</strong> {selections.block}</li>
        <li><strong>Codigo de síntoma:</strong> {selections.symptomBlock}</li>
        <li>{selections.subSymptom}</li>
        <li><strong>Código de reparación:</strong> {selections.repairCode}</li>
        <li>{selections.finalRepair}</li>
      </ul>
      <hr/>
       {selections.finalRepair === 'M09-AJUSTE' && <div>
          <h3>Proceso correcto del cierre de boletin RT5300 , RT6300</h3>   
           <p>Aplicar los boletines de servicio para estos modelos,<strong>1 Boletin: Actualizacion de sowftware.</strong> Los cuales se encuentran en GSPN, <br /><strong>2 Boletin: Inspeccion de ductos, correcto sellado de puerta, uso de arandela y camara endoscopica</strong><br />La aplicacion del primer boletin no inhibe la aplicacion del segundo boletin.</p>
           <p>Una vez agregados los codigos correctos generaremos la saw para el extra de pago en mano<br/>de esta forma se pagara 200 mas 160 de la extra saw, es necesario subir toda la informacion<br/>solicitada, El RT adjunto, evidencia de que se utilizo la camara endoscopica y la saw indicando<br/>"Pago de extra mano, aplicacion de service boletin"  </p> 
    
        </div>}
        {selections.finalRepair === 'M09-AJUSTE.' && <div>
          <h3>Cierre en caso de cambio de espreas</h3>
          <p>Recordemos que al hacer cambio de espreas tenemos que generar la SAW para el pago de 160 extra, mas pago de espreas.</p>
          </div>}
    </div>
  );
};

export default FinalSummary;
