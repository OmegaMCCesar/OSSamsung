// src/components/SymptomBlock.js
import React from 'react';
import styles from '../styles/SymptomCode.module.css';


const SymptomBlock = ({ selectedBlock, onSymptomSelect }) => {
  const symptomBlocks = {
    '5E04-MOTOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION*',description:'Si ya se verifico que la tarjeta main manda los voltajes de manera correcta, nada obstruye el giro, y medimos los bornes del motor 1/2,2/3, 3/1 el cual nos dan los valores incorrectos, usamos este codigo'},{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Un motor dañado puede causar problemas de lavado y centrifugado'}],
    '5D03-HOSE-DRAIN':[{simtom:'SRC029-PROVEEDOR DE AGUA(HDW)',description:'Si el problema es la manguera de desaguea tapada se usaran estos codigos de cierre'}],
    '5D02-DRAIN MOTOR(AUTO)':[{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Esta pieza libera el freno de trasnmision para permitir el libre giro de tina'}],
    '5D01-PUMP MOTOR':[{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Si la bomba de drenado no funciona y no desecha el agua de la tina provocara que la lavadora no centrifuge, asi que presentara problemas de rotacion'}],
    '4C09-EVAPORATOR COVER':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION*',description:''}],
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
    'AR41-HOT PIPE':[{simtom:'SRC022-FUGA/FUGA**',description:'Usar este codigo en fuga interna'}],
    '4F05-REFRIGERATOR DOOR':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(RT31)',description:'Uso de este cierre para el empleo de boletin en refrigeradores RT31'}],
    '5A01-PCB ASS,Y(MAIN)':[{simtom:'SRC013-PROBLEMAS DE OPERACION(PCB)',description:'Cuando tenemos un suministro de correiente electrica correcto, y el equipo no enciende, o no tenemos voltajes de salida de la tarjeta a algun componente, seguramente estemos habalndo de la tarjeta main'}],
    '5A02-PCB ASS,Y(SUB)':[{simtom:'SRC013-PROBLEMAS DE OPERACION(PCB)',description:'Cuando tenemos un suministro de correiente electrica correcto, y el equipo no enciende, o no tenemos voltajes de salida de la tarjeta a algun componente, seguramente estemos habalndo de la tarjeta main'}],
    '5B01-ASSY-DOOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION(DOOR)',description:'Una puerta que no cierra de manera correcta nos detendra el funcionamiento de la lavadora'}],
    '5B05-DOOR-LOOK S/W':[{simtom:'SRC013-PROBLEMAS DE OPERACION(S/W)',description:'Si al cerrar la puerta no nos detecta el cerrado de la puerta puede ser un indicador de interruptor de puerta dañado, antes de cambiar o solicitar pieza, revisar que la puerta este bien cerrada, nivelada, que el arnes si mande el voltaje correcto'}],
    '5C02-WATER-VALVE':[{simtom:'SRC029-PROVEEDOR DE AGUA',description:'Si no tenemos flujo de agua , verificamos el ohmeaje de cada valvula de agua, normalmente a 1k ohm, a 127v. El daño puede ser por la bobina quemada o por el cuerpo de la valvula dañana'}],
    '5C03-WATER LEVEL SENSOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION(P)',description:'Algunos sintomas que nos puede dar un presostato dañado es un llenado sin parar hasta que se desborde el agua, un drenado sin fin, en el cual no detecta los niveles de agua'},{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Si el presostato no detecta que se ha drenado por completo el agua, la lavadora no podra exprimir'}],
    '5C04-HOSE DRAWER':[{simtom:'SRC029-PROVEEDOR DE AGUA(HDW)',description:'Aplicar void 1 para sacar de garantia ya que este problema es causado por cliente'}],
    'FAUNA NOCIVA':[{simtom:'FAUNA ENCONTRADA EN EQUIPO',description:'Cualquier tipo de animal o insecto encontrado en el quipo es considerado fauna nociva, en estos casos es necesario cerrar con el bloque de codigo(pieza) donde se encontro la fauna, si tenemos mas de un componente con fauna, tomaremos como referencia la parte de mayor importancia, aplicar void 1 para sacar de garantia el equipo'}],
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

