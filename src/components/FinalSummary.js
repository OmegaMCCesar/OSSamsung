import React, { /* useEffect  */} from 'react';
import styles from '../styles/FinalSummary.module.css';
/* import { useSerialNumber } from '../contexts/SerialNumberContext';
import { getDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../configs/firebase'; */

const FinalSummary = ({ selections }) => {
  /* const { serialNumber } = useSerialNumber(); */

  // Función para comparar dos objetos de selección
  /* const areSelectionsEqual = (selection1, selection2) => {
    return (
      selection1.equipment === selection2.equipment &&
      selection1.block === selection2.block &&
      selection1.symptomBlock === selection2.symptomBlock &&
      selection1.subSymptom === selection2.subSymptom &&
      selection1.repairCode === selection2.repairCode &&
      selection1.finalRepair === selection2.finalRepair
    );
  }; */

  /* useEffect(() => {
    const saveSummary = async () => {
      if (serialNumber) {
        const docRef = doc(db, 'serialNumbers', serialNumber);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const existingSummaries = docSnap.data().summaries || [];
          const isDuplicate = existingSummaries.some((summary) =>
            areSelectionsEqual(summary, selections)
          );

          if (!isDuplicate) {
            await updateDoc(docRef, {
              summaries: arrayUnion(selections),
            });
          } else {
            alert('Este cierre ya ha sido registrado anteriormente.');
          }
        }
      }
    };

    saveSummary();
  }, [serialNumber, selections]); */

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
        <li><strong>Equipo seleccionado:</strong> {equipment}</li>
        <li><strong>Bloque de defecto:</strong> {block}</li>
        <li><strong>Código de síntoma:</strong> {symptomBlock}</li>
        {subSymptom && <li><strong>Sub-síntoma:</strong> {subSymptom}</li>}
        <li><strong>Código de reparación:</strong> {repairCode}</li>
        {finalRepair && <li><strong>Reparación final:</strong> {finalRepair}</li>}
      </ul>
      <hr />
      {renderAdditionalInfo()}
    </div>
  );
};

export default FinalSummary;

