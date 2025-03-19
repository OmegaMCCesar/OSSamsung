import React from 'react';
import styles from '../styles/FinalSummary.module.css';

const FinalSummary = ({ selections }) => {
  const {
    equipment,
    block,
    symptomBlock,
    subSymptom,
    repairCode,
    finalRepair,
  } = selections;

  const renderAdditionalInfo = () => {
    switch (finalRepair) {
      case 'M09-AJUSTE':
        return (
          <section>
            <h3>Proceso correcto del cierre de boletín RT5300, RT6300</h3>
            <p>
              Aplicar los boletines de servicio para estos modelos:
              <br />
              <strong>1. Boletín:</strong> Actualización de software. Disponible en GSPN.
              <br />
              <strong>2. Boletín:</strong> Inspección de ductos, correcto sellado de puerta, uso de arandela y cámara endoscópica.
              <br />
              La aplicación del primer boletín no inhibe la aplicación del segundo boletín.
            </p>
            <p>
              Una vez agregados los códigos correctos, generaremos la SAW para el pago de mano extra.
            </p>
          </section>
        );
      case 'M09-AJUSTE.':
        return (
          <section>
            <h3>Cierre en caso de cambio de espreas</h3>
            <p>
              Al realizar el cambio de espreas, es necesario generar la SAW para el pago de mano extra, además del pago de las espreas.
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h2>Resumen Final de Cierre</h2>
      <ul className={styles.summaryList}>
        <li key="equipment"><strong>Equipo seleccionado:</strong> {equipment}</li>
        <li key="block"><strong>Bloque de defecto:</strong> {block}</li>
        <li key="symptomBlock"><strong>Código de síntoma:</strong> {symptomBlock}</li>
        {subSymptom && <li key="subSymptom">{subSymptom}</li>}
        <li key="repairCode"><strong>Código de reparación:</strong> {repairCode}</li>
        {finalRepair && <li key="finalRepair">{finalRepair}</li>}
      </ul>
      <hr />
      {renderAdditionalInfo()}
    </div>
  );
};

export default FinalSummary;
