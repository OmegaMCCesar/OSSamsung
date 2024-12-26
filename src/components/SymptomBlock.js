// src/components/SymptomBlock.js
import React from 'react';
import styles from '../styles/SymptomCode.module.css';

const SRC030 = ' SRC030-PROBLEMA DE ROTACION ';
const SRC030M = ' SRC030-PROBLEMA DE ROTACION  ';
const SCR021 = 'SRC021-CALENTAMIENTO/REFRIGERACION ';
const SRC013 = ' SRC013-PROBLEMA DE OPERACION ';
const SRC013MEC = '  SRC013-PROBLEMAS DE OPERACION  '
const SRC013PCB = 'SRC013-PROBLEMAS DE OPERACION(PCB)';
const SRC012 = ' SRC012-PROBLEMAS DE ENCENDIDO ';
const SRC012PCB = ' SRC012-PROBLEMAS DE ENCENDIDO  ';


const SymptomBlock = ({ selectedBlock, onSymptomSelect }) => {
  const symptomBlocks = {
    '5B03-DIAPHRAGM':[{simtom:'SRC022-FUGA/FUGA ',description:'Normalmente esta parte se puede dañar al no dar mantenimiento , por el uso incorrecto continuo del equipo'}],
    '5G01-TOP-COVER':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO ',description:'Una ves que se confirmo voltaje adecuado entrante a display y este no enciende sera necesario cambiar la pieza'},{simtom:'SRC013-PROBLEMAS DE OPERACION',description:'Cuando encontramos daño en los botones, no digita o se puede controlar de manera correcta el equipo, es pposible que este dañado el'}],
    '5E03-FLANGE SHAFT':[{simtom:'SRC015-RUIDO ',description:'Un desvalance o daño de esta pieza puede causar ruidos excesivos'},{simtom:'SRC030-PROBLEMA DE ROTACION ', description:'El que esta pieza este dañada , normalmente fracturada de alguno de los brazos, terminara dejando car la tina , provocando la caida de la tina, rozando con la tina plastica, impidiendo el funcionamiento del equipo'}],
    ' 5E04-MOTOR ':[{simtom:'SRC015-RUIDO ',description:'Una polea dañada puede ocasionar ruidos durante el funcionamiento , atorar el tambor y no permitir rotar la tina'},{simtom:'SRC030-PROBLEMAS DE ROTACION',description:'Una polea dañada puede causar el atasco del motor'}],
    '5E05-BELT ':[{simtom:' SRC013-PROBLEMAS DE OPERACION ',description:'La banda dañada puede ocasionar percepcion de ruido en funcionamineto sin embargo al estar dañada, el equipo no podra funcionar'}],
    '5E01-TUB':[{simtom:'SRC015-RUIDO ',description:'Codigos a usar para tambor o tina, si esta esta golpeada , o con algun daño puede ocasionar ruidos raros o golpeteo interior dende del equipo con otras partes o piezas'}],
    '5F04-THERMOSTAT ':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION ',description:'Codigos de cierre para termostato, si el equipo gira pero no calienta existe gran posibilidad que este dañado el termostato'}],
    '5F04-THERMOSTAT':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION ',description:'Codigos de cierre para termostato, si el equipo gira pero no calienta existe gran posibilidad que este dañado el termostato'},{simtom:'SRC030-PROBLEMAS DE ROTACION ',description:'Algunos modelos necesitan que esta pieza permita el paso de corriente al motor para poder funcionar'}],
    '5E05-BELT':[{simtom:'  SRC013-PROBLEMAS DE OPERACION ',description:'La banda dañada puede ocasionar percepcion de ruido en funcionamineto sin embargo al estar dañada, el equipo no podra funcionar'}],
    '5E10-CLUTCH':[{simtom:'SRC030-PROBLEMAS DE ROTACION    ',description:'Codigos correctos para cierre cambio de transmision'}],
    '5F07-HEATER-DRY ':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION ',description:'Usamos estos codigos al cambiar la valvula de gas'},{simtom:'SRC013-PROBLEMAS DE OPERACION ',description:'Esta pieza es la encargada de generar el calor para encender la llama del equipo, si la pieza esta dañada puede que la tina gire pero no caliente'}],
    '5H01-FILTER':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION   ',description:'Recordemos que este filtro siempre debe de estar limpio para poder permitir el flujo de aire caliente'}],
    '5F05-THERMISTOR':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(WD)',description:'Si esta pieza esta dañana no tendremos paso de corriente al sistema de calefaccion'}],
    '5E06-PULLEY-MOTOR':[{simtom:' SRC013-PROBLEMAS DE OPERACION ',description:'Podemos tener sonidos raros cuando esta polea esta dañada como rechinidos, la banda puede llegar a dañarse si la polea tiene desgaste o algun tipo de juego'}],
    '5F07-HEATER-DRY':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(WD)',description:'Una ves que ya verificamos la continuidad de la resistencia y ohms dentro del rango correcto, daremos por echo que la resistencia esta dañada'}],
    '5F03-MOTOR-FAN':[{simtom:'SRC030-PROBLEMA DE ROTACION(MF)',description:'Si esta pieza falla nos dara un problema en el secado'}],
    '5E11-DAMPER ':[{simtom:'SRC030-PROBLEMA DE ROTACION(D)',description:'Movimientos de la lavadora excesivo, vibracion, golpeteos de lamina, pueden ser problemas de dampers'}],
    '5E11-DAMPER':[{simtom:'SRC030-PROBLEMA DE ROTACION(D)',description:'Movimientos de la lavadora excesivo, vibracion, golpeteos de lamina, pueden ser problemas de dampers'}],
    '5E07-PULSATOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION**',description:'Si la transmision y motor funcionan correctamente , se escucha el funcionamiento pero no se mueve el pulseitor puede estar desgastado y no agitar'}],
    '5E04-MOTOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION(m)',description:'Si ya se verifico que la tarjeta main manda los voltajes de manera correcta, nada obstruye el giro, y medimos los bornes del motor 1/2,2/3, 3/1 el cual nos dan los valores incorrectos, usamos este codigo'},{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Un motor dañado puede causar problemas de lavado y centrifugado'}],
    '5E04-MOTOR(m)':[{simtom:'SRC013-PROBLEMAS DE OPERACION(m)',description:'Despues de verificar parte electrica y mecanicas de motor, no funcionan de manera adecuada o no se encuentran en buen estado, podemos cambiar el motor y usar los siguientes codigos'},{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(m)',description:'Si las partes mecanicas estan en buen estado pero electronicamente tenemos algun defecto o mala marcacion en los bornes del motor, ohms fuera de rango, bobinas aterrizadas con el armazon del motor'},{simtom:'SRC030-PROBLEMAS DE ROTACION(m)',description:'Uso de codigos cuando el motor se encuentra dañado'}],
    '5E04-MOTOR ':[{simtom:'SRC013-PROBLEMAS DE OPERACION*',description:'Si ya se verifico que la tarjeta main manda los voltajes de manera correcta, nada obstruye el giro, y medimos los bornes del motor 1/2,2/3, 3/1 el cual nos dan los valores incorrectos, usamos este codigo'},{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Un motor dañado puede causar problemas de lavado y centrifugado'}],
    '5D03-HOSE-DRAIN':[{simtom:'SRC029-PROVEEDOR DE AGUA(HDW)',description:'Si el problema es la manguera de desaguea tapada se usaran estos codigos de cierre'}],
    '5D02-DRAIN MOTOR(AUTO)':[{simtom:'SRC030-PROBLEMA DE ROTACION    ',description:'Esta pieza libera el freno de trasnmision para permitir el libre giro de tina'}],
    '5D01-PUMP MOTOR':[{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Si la bomba de drenado no funciona y no desecha el agua de la tina provocara que la lavadora no centrifuge, asi que presentara problemas de rotacion'}],
    '4C09-EVAPORATOR COVER SERVICE BOLETIN':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION*',description:'Usar estos codigos cuando se realice la aplicacion del boletin'}],
    '4C09-EVAPORATOR COVER':[{simtom:'SRC030-PROBLEMA DE ROTACION  ',description:'El hielo excesivo puede dañar el motor ventilador, lo que causa un enfriamiento pobre en la unidad'}],
    '4B01-COMPRESSOR':[{simtom:'SRC015-RUIDO',description:'Usar este codigo cuando el motor presenta un sonido anomalo'},{simtom:'SRC013-PROBLEMAS DE OPERACION(COMPRESSOR)', description:'Usamos este codigo cuando el motor no funciona correctamente, puede ser el compresor dañado, mal conectado o alguna razon por la cual el compresor no puede trabajar de manera adecuada'}],
    '4A01-MAIN PCB':[{simtom:SRC013PCB,description:'Usamos este codigo cuando la tarjeta enciende pero no esta funcionando correctamente'},{simtom:'SRC019-PROBLEMAS DE CONEXION',description:'Puede ser causado por algun arnes dañado, terminales dañadas, cables trozados, o conexiones flojas'}],
    '4A02-PANEL(DISPLAY) PCB':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(PCB DISPLAY)',description:'Usamos ee codigo cuando la tarjeta recibe corriente electrica con parametros de 110V a 127V y no enciende.'}],
    'AB03-RELAY PTC':[{simtom:'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR*)',description:'Esta pieza se encarga del arranque del motor, si esta dañanada motor no funciona, funcuina  unos minutos y se apaga, revisar bornes de motor para verificar el buen estado del motor'}],
    '4B04-COMPRESSOR FAN MOTOR(CIRCUIT MOTOR)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION',description:'Uso de este codigo cuando el ventilador tiene un problema mecanico o electrico '}],
    '4B05-CONDENSER':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(CONDENSER)',description:'Si el condensador se encuentra sin servicio, demasiado lleno de suciedad, pelusa o algun material que impida el correcto flujo de aire para la extraccion de calor, nos dara un enfriamientio tenue'},{simtom:'SRC022-FUGA/FUGA',description:'Cualquier perdida de gas es considerada fuga de refrigerante, en este caso es en latuberia de condensador'}],
    '4C05-EVAPORATOR':[{simtom:'SRC022-FUGA/FUGA',description:'Cualquier perdida de gas por desgaste del condensador es considerada fuga de gas'}],
    '4B09-GAS LEAKAGE':[{simtom:'SRC022-FUGA/FUGA(GAS LEAKAGE)',description:'Cualquier fuga que pueda ser reparada en la cual no se cambia piezas, a excepcion de dryer es gas leakage'},{simtom:'SRC022-FUGA/FUGA(FUGA INTERNA)',description:'Usar estos codigos para fuga interna y cambio fisico'}],
    '4C08-AMBIENT SENSOR(ELECTRONIC)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(SENSOR ELECTRONIC)',description:'Usamos este codigo cuado tenemos un enfriamento pobre o sobre enfriamiento, ya que los sensores termistores ya no marcan una lectura correcta de la temperatura hambiente'}],
    'BR13-WATER VALVE(ICE/WATER)':[{simtom:'SRC029-PROVEDOR DE AGUA',description:'Cuando la fabrica de hielos no hace hielos o el refrigerador no despacha agua, puede ser sintoma de valvulas dañadas, una vez cambiando la pieza usaremos este codigo'}],
    'BR07-ICE MAKER':[{simtom:'SRC013-PROBLEMAS DE OPERACION(IM)',description:'Usamos este codigo ya revisamos los demas componentes involucrados para la fabricacion de hielos, y se cambia la ice maker'}],
    'AR41-HOT PIPE':[{simtom:'SRC022-FUGA/FUGA**',description:'Usar este codigo en fuga interna'}],
    '4F05-REFRIGERATOR DOOR':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(RT31)',description:'Uso de este cierre para el empleo de boletin en refrigeradores RT31'}],
    '5A01-PCB ASS,Y(MAIN)':[{simtom:'SRC013-PROBLEMAS DE OPERACION(PCB)',description:'Cuando tenemos un suministro de correiente electrica correcto, y el equipo no enciende, o no tenemos voltajes de salida de la tarjeta a algun componente, seguramente estemos habalndo de la tarjeta main'},{simtom:'SRC012-PROBLEMAS DE ENCENDIDO',description:'Si tenemos alimentacion correcta del toma corriente, en el cordon de alimentacion y aun asi no enciende de manera correcata'}],
    '5A02-PCB ASS,Y(SUB)':[{simtom:'SRC013-PROBLEMAS DE OPERACION(PCB)',description:'Cuando tenemos un suministro de correiente electrica correcto, y el equipo no enciende, o no tenemos voltajes de salida de la tarjeta a algun componente, seguramente estemos habalndo de la tarjeta main'},{simtom:'SRC012-PROBLEMAS DE ENCENDIDO',description:'Si tenemos alimentacion correcta del toma corriente, en el cordon de alimentacion y aun asi no enciende de manera correcata'}],
    '5B01-ASSY-DOOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION(DOOR)',description:'Una puerta que no cierra de manera correcta nos detendra el funcionamiento de la lavadora'}],
    '5B05-DOOR-LOOK S/W':[{simtom:'SRC013-PROBLEMAS DE OPERACION(S/W)',description:'Si al cerrar la puerta no nos detecta el cerrado de la puerta puede ser un indicador de interruptor de puerta dañado, antes de cambiar o solicitar pieza, revisar que la puerta este bien cerrada, nivelada, que el arnes si mande el voltaje correcto'}],
    '5C02-WATER-VALVE':[{simtom:'SRC029-PROVEEDOR DE AGUA',description:'Si no tenemos flujo de agua , verificamos el ohmeaje de cada valvula de agua, normalmente a 1k ohm, a 127v. El daño puede ser por la bobina quemada o por el cuerpo de la valvula dañana'}],
    '5C03-WATER LEVEL SENSOR':[{simtom:'SRC013-PROBLEMAS DE OPERACION(P)',description:'Algunos sintomas que nos puede dar un presostato dañado es un llenado sin parar hasta que se desborde el agua, un drenado sin fin, en el cual no detecta los niveles de agua'},{simtom:'SRC030-PROBLEMA DE ROTACION',description:'Si el presostato no detecta que se ha drenado por completo el agua, la lavadora no podra exprimir'}],
    '5C04-HOSE DRAWER':[{simtom:'SRC029-PROVEEDOR DE AGUA(HDW)',description:'Aplicar void 1 para sacar de garantia ya que este problema es causado por cliente'}],
    '7A01-MAGNETRON':[{simtom:SCR021,description:'Puede que el horno encienda y opere pero presente fallos al calenta muy poco o nulo'},{simtom:SRC013,description:'Puede que el equipo haga un ruido muy fuerte al intentar calentar mas no se sienta calentamiento alguno'}],
    '7A02-H.V.CAPACITOR':[{simtom:SRC013,description:'Puede que el equipo haga un ruido muy fuerte al intentar calentar mas no se sienta calentamiento alguno'}],
    '7A03-H.V.TRANS':[{simtom:SRC013,description:'Puede que el equipo haga un ruido muy fuerte al intentar calentar mas no se sienta calentamiento alguno'}],
    '7A04-POWER CORD':[{simtom:SRC012,description:'Si el cordon esta quemado , tiene alguna cortadura o desgaste , puede darnos un mal funcionamiento del horno o definitivamente no encender'}],
    '7A05-H.V.FUSE':[{simtom:SRC012,description:'Si no tenemos ninguna señal de funcionmiento , no enciende la pantalla o luz del horno y ya comprobamos que tenemos corriente electrica, tanto del toma corriente como el cordon de alimentacion, podemos determinar que el fusible esta dañado'}],
    '7A06-H.V.DIODE':[{simtom:SRC013,description:'Cuando esta pieza esta dañana el sistema de calefaccion no funciona de manera correcta, solo se escucha un ruido mas fuerte de lo normal, sin embargo no calentara ni un poco'}],
    '7B01-FAN MOTOR':[{simtom:SRC030,description:'Codigos al cambiar el fan motor'}],
    '7B02-DRIVE MOTOR':[{simtom:SRC030M, description:'Puede que el horno caliente mas no gire el plato, si esto sucede puede haber un calentamiento disparejo'}],
    '7C01-MAIN PCB':[{simtom:SRC013PCB,description:'Puede que el horno encienda pero no opere de manera correcta'},{simtom:SRC012PCB,description:'Si tenemos alimentacion electrica y valores de voltaje correctos, el fusible esta en buen estado , seguramente sera problemas de la PCB'}],
    '7D01-LAMP':[{simtom:SRC012,description:'Puede que el horno opere con normalidad pero no encienda la luz interior'}],
    '7D04-HEATER':[{simtom:SCR021,description:'Si tenemos corriente en la resistencia, los termincos estan en buen eestado, seguramente el problema sea la resistencia grill'}],
    '7D05-MICRO S/W':[{simtom:SRC013,description:'Puede que la cuenta regresiva en el contador descienda pero no caliente el horno, esto se puede deber a algun fallo en los micros'}],
    '7D06-MEMBRANE':[{simtom:SRC013,description:'Si el equipo enciende pero los botones no pueden ser selecionados o no se alcanza a visualisar los numeros de la pantalla, podria ser falla en la membrana'},],
    '7E01-DOOR':[{simtom:SRC013MEC,description:'Una puerta desajustada o caida puede provocar un mal funcionamiento del hotno , o no dejarlo funcionar para nada, puede que encienda pero no opere'}],
    '7D09-SENSOR':[{simtom:SRC013,description:'Si el horno enciende pero no opera , puede ser que el termico este dañado'}],
    '7D07-WIRE HARNESS':[{simtom:SRC012,description:'Siempre que tengamos algun funcionamiento deficiente en el equipo es necesario revisar el arnes de cables , si este esta dañado o cortado, no permitira el paso de corriente a los componentes'},{simtom:SRC013,description:'Estes es otro problema que puede causar mal funcionamiento en el equipo, si el arnes esta dañado, cortado, o en corto, no permitira el paso de corriente a los componentes'}],
    'FAUNA NOCIVA':[{simtom:'FAUNA ENCONTRADA EN EQUIPO',description:'Cualquier tipo de animal o insecto encontrado en el quipo es considerado fauna nociva, en estos casos es necesario cerrar con el bloque de codigo(pieza) donde se encontro la fauna, si tenemos mas de un componente con fauna, tomaremos como referencia la parte de mayor importancia, aplicar void 1 para sacar de garantia el equipo'}],
    'select(Fuga de gas)':[{simtom:'SRC021-CALENTAMIENTO/REFRIGERACION(GO)',description:'Uso de codigo si el quemador, tiene una flama dispareja, y no calienta de forma pareja'},{simtom:' SRC022-FUGA/FUGA ',description:'Cual quier fuga de gas en conexiones o en elementos de la estufa sera tratado con este codigo'}],
    'select(bujia)':[{simtom:' SRC012-PROBLEMAS DE ENCENDIDO ',description:'Si el equipom se encuentra bien conectado y con las adecuaciones necesarias, podemos usar este codigo'}]
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione el bloque de síntoma para {selectedBlock}</h2>
      {symptomBlocks[selectedBlock] ? symptomBlocks[selectedBlock].map((symptom) => (
        <div key={symptom.simtom}  className={styles.option}>
          <button onClick={() => onSymptomSelect(symptom.simtom)} >{symptom.simtom}</button>
          <textarea readOnly>{symptom.description}</textarea>
        </div>       
      )):(<p> No se a a encontrado bloque de sintoma</p>)}
    </div>
  );
};

export default SymptomBlock;

