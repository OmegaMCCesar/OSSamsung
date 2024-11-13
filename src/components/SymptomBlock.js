// src/components/SymptomBlock.js
import React from 'react';
import styles from '../styles/SymptomCode.module.css';


const SymptomBlock = ({ selectedBlock, onSymptomSelect }) => {
  const symptomBlocks = {
    '4B01-COMPRESSOR':[{simtom:'SRC015-RUIDO',description:'Usar este codigo cuando el motor presenta un sonido anomalo'},{simtom:'SRC013-PROBLEMAS DE OPERACION(COMPRESSOR)', description:'Usamos este codigo cuando el motor no funciona correctamente, puede ser el compresor dañado, mal conectado o alguna razon por la cual el compresor no puede trabajar de manera adecuada'}],
    '4A01-MAIN PCB':[{simtom:'SRC013-PROBLEMAS DE OPERACION(PCB)',description:'Usamos este codigo cuando la tarjeta enciende pero no esta funcionando correctamente'},{simtom:'SRC019-PROBLEMAS DE CONEXION',description:'Puede ser causado por algun arnes dañado, terminales dañadas, cables trozados, o conexiones flojas'}],
    '4A02-PANEL(DISPLAY) PCB':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(PCB DISPLAY)',description:'Usamos ee codigo cuando la tarjeta recibe corriente electrica con parametros de 110V a 127V y no enciende.'}],
    'AB03-RELAY PTC':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR*)',description:'Esta pieza se encarga del arranque del motor, si esta dañanada motor no funciona, funcuina  unos minutos y se apaga, revisar bornes de motor para verificar el buen estado del motor'}],
    '4B04-COMPRESSOR FAN MOTOR(CIRCUIT MOTOR)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION',description:'Uso de este codigo cuando el ventilador tiene un problema mecanico o electrico '}],
    '4B05-CONDENSER':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(CONDENSER)',description:'Si el condensador se encuentra sin servicio, demasiado lleno de suciedad, pelusa o algun material que impida el correcto flujo de aire para la extraccion de calor, nos dara un enfriamientio tenue'},{simtom:'SRC022-FUGA/FUGA',description:'Cualquier perdida de gas es considerada fuga de refrigerante, en este caso es en latuberia de condensador'}],
    '4C05-EVAPORATOR':[{simtom:'SRC022-FUGA/FUGA',description:'Cualquier perdida de gas por desgaste del condensador es considerada fuga de gas'}],
    '4B09-GAS LEAKAGE':[{simtom:'SRC022-FUGA/FUGA(GAS LEAKAGE)',description:'Cualquier fuga que pueda ser reparada en la cual no se cambia piezas, a excepcion de dryer es gas leakage'}],
    '4C08-AMBIENT SENSOR(ELECTRONIC)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(SENSOR ELECTRONIC)',description:'Usamos este codigo cuado tenemos un enfriamento pobre o sobre enfriamiento, ya que los sensores termistores ya no marcan una lectura correcta de la temperatura hambiente'}],
    'BR13-WATER VALVE(ICE/WATER)':[{simtom:'SRC029-PROVEDOR DE AGUA',description:'Cuando la fabrica de hielos no hace hielos o el refrigerador no despacha agua, puede ser sintoma de valvulas dañadas, una vez cambiando la pieza usaremos este codigo'}],
    'BR07-ICE MAKER':[{simtom:'SRC013-PROBLEMAS DE OPERACION(IM)',description:'Usamos este codigo ya revisamos los demas componentes involucrados para la fabricacion de hielos, y se cambia la ice maker'}],
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
          <button onClick={() => onSymptomSelect(symptom.simtom)} >{symptom.simtom}</button>
          <textarea readOnly>{symptom.description}</textarea>
        </div>       
      ))}
    </div>
  );
};

export default SymptomBlock;

