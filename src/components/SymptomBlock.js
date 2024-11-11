// src/components/SymptomBlock.js
import React from 'react';
import styles from '../styles/SymptomCode.module.css';

const SymptomBlock = ({ selectedBlock, onSymptomSelect }) => {
  const symptomBlocks = {
    '4B01-COMPRESSOR':[{simtom:'SRC015-RUIDO',description:'Usar este codigo cuando el motor presenta un sonido anomalo'},{simtom:'SRC013-PROBLEMAS DE OPERACION(COMPRESSOR)', description:'Usamos este codigo cuando el motor no funciona correctamente, puede ser el compresor dañado, mal conectado o alguna razon por la cual el compresor no puede trabajar de manera adecuada'}],
    '4A01-MAIN PCB':[{simtom:'SRC013-PROBLEMAS DE OPERACION(PCB)',description:'Usamos este codigo cuando la tarjeta enciende pero no esta funcionando correctamente'},{simtom:'SRC019-PROBLEMAS DE CONEXION',description:'Puede ser causado por algun arnes dañado, terminales dañadas, cables trozados, o conexiones flojas'}],
    '4A02-PANEL(DISPLAY) PCB':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(PCB DISPLAY)',description:'Usamos ee codigo cuando la tarjeta recibe corriente electrica con parametros de 110V a 127V y no enciende.'}],
    'AB03-RELAY PTC':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR)',description:'Esta pieza se encarga del arranque del motor, si esta dañanada motor no funciona, funcuina  unos minutos y se apaga, revisar bornes de motor para verificar el buen estado del motor'}],
    '4B04-COMPRESSOR FAN MOTOR(CIRCUIT MOTOR)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION',description:'Uso de este codigo cuando el ventilador tiene un problema mecanico o electrico '}],
    '4B05-CONDENSER':[{simtom:'HE2-ENFRIAMIENTO POBRE',description:'Usaremos este codigo cuando el refrigerador presenta frio, aun sea muy poco, tecnico tiene que verificar cual es la causa por la cual refrigerador no enfria con la potencia adecuada'},{simtom:'SRC022-FUGA/FUGA',description:''}],
    '4C05-EVAPORATOR':[{simtom:'SRC022-FUGA/FUGA',description:''}],
    '4B09-GAS LEAKAGE':[{simtom:'SRC022-FUGA/FUGA(GAS LEAKAGE)',description:''}],
    '4C08-AMBIENT SENSOR(ELECTRONIC)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(SENSOR ELECTRONIC)',description:'Usamos este codigo cuado tenemos un enfriamento pobre o sobre enfriamiento, ya que los sensores termistores ya no marcan una lectura correcta de la temperatura hambiente'}],
    '':[{simtom:'',description:''}],
    Motor: ['No gira', 'Vibración'],
    Transmisión: ['Desgaste', 'Falla mecánica'],
    Encendido: ['Chispa débil', 'No enciende'],
    Quemador: ['Falla de llama', 'Obstrucción'],
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de síntoma para {selectedBlock}</h2>
      {symptomBlocks[selectedBlock].map((symptom) => (
        <div key={symptom.simtom}  className={styles.option}>
          <p onClick={() => onSymptomSelect(symptom.simtom)} >{symptom.simtom}</p>
          <textarea>{symptom.description}</textarea>
        </div>       
      ))}
    </div>
  );
};

export default SymptomBlock;

