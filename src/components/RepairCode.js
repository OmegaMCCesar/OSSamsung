// src/components/RepairCode.js
import React from 'react';
import styles from '../styles/RepairCode.module.css';

const SRC009 = 'SRC009-CAMBIAR/ABONAR/DEVOLVER';
const SRC002 = 'SRC002-AJUSTE/ALINEACION/CONFIGURACION.';
const SRC002P = 'SRC002-AJUSTE/ALINEACION/CONFIGURACION  ';

const RepairCode = ({ selectedSubSymptom, onRepairSelect }) => {

  const repairOptions = {
    'HG6-EXCESO DE AGUA ':['SRC000-CAMBIO DE PIEZA '],
    'HKD-RUIDO DE DRENADO':['SRC000-CAMBIO DE PIEZA '],
    'D12-FILTER CLEANING': ['SRC003-LIMPIEZA'],
    'HC1-NO HAY CALEFACCION.':[SRC002],
    'HC2-CALEFACCION DEBIL.':[SRC002,'SRC008-OTROS PROBLEMAS'],
    'HC3-CALEFACCION EXCESIVA.':[SRC002],
    'C94P-DOOR ALIGMENT ':[SRC002P],
    'C94-DOOR ALIGMENT':['SRC000-CAMBIO DE PIEZA'],
    'HN1-MARCA, ABOLLADURA':['SRC000-CAMBIO DE PIEZA      '],
    'A46-CAMBIO DE PARTES COSMETICAS(SOLICITUD DEL CLIENTE)':['SRC000-CAMBIO DE PIEZA      '],
    'HN2-ESPACIO, HUECO':['SRC000-CAMBIO DE PIEZA      '],
    'HN3-DEFORMACION':['SRC000-CAMBIO DE PIEZA      '],
    'HN4-DECOLORACION':['SRC000-CAMBIO DE PIEZA      '],
    'HN6-PARTES SEPARADAS':['SRC000-CAMBIO DE PIEZA      '],
    'HN7-PINTURA DESPEGADA':['SRC000-CAMBIO DE PIEZA      '],
    'HN8-OXIDADO':['SRC000-CAMBIO DE PIEZA      '],
    'HNG-RASGUÑADO':['SRC000-CAMBIO DE PIEZA      '],
    'AC1-RUIDO MECANICO':['SRC000-CAMBIO DE PIEZA'],
    'HC1-NO HAY CALEFACCION ':['SRC000-CAMBIO DE PIEZA ','SRC008-OTROS PROBLEMAS'],
    'HC2-CALEFACCION DEBIL':['SRC008-OTROS PROBLEMAS'],
    'HC2-CALEFACCION DEBIL ':['SRC000-CAMBIO DE PIEZA ','SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE.':[SRC009,'SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE(COMPRESSOR*)':['SRC000-CAMBIO DE PIEZA*','SRC008-OTROS PROBLEMAS'],
    '  HA1-NO ENCIENDE  ':['SRC000-CAMBIO DE PIEZA(PCB)','SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE  ':['SRC000-CAMBIO DE PIEZA ','SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE(M)':['SRC000-CAMBIO DE PIEZA(PCB)','SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE':['SRC000-CAMBIO DE PIEZA(PCB DISPLAY)','SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE(m)':['SRC000-CAMBIO DE PIEZA(m)','SRC008-OTROS PROBLEMAS'],
    'HA1-NO ENCIENDE ':['SRC000-CAMBIO DE PIEZA  ','SRC008-OTROS PROBLEMAS'],
    'HK1-RUIDO DE MOTOR':['SRC008-OTROS PROBLEMAS'],
    'HLC-NO FUNCIONA EL COMPRESSOR':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)','SRC008-OTROS PROBLEMAS'],
    'HLJ-DIRECCION DE GIRO NO AJUSTADO':['SRC000-CAMBIO DE PIEZA'],
    'HG9-NO LAVA ':['SRC000-CAMBIO DE PIEZA','SRC008-OTROS PROBLEMAS'],
    ' HL1-ENCIENDE, PERO NO OPERA ':['SRC000-CAMBIO DE PIEZA ','SRC008-OTROS PROBLEMAS'],
    'HL1-ENCIENDE, PERO NO OPERA':['SRC000-CAMBIO DE PIEZA  ','SRC008-OTROS PROBLEMAS'],
    'HL2-OPERACION INTERMITENTE':['SRC000-CAMBIO DE PIEZA  '],
    'HL2-OPERACION INTERMITENTE ':['SRC000-CAMBIO DE PIEZA '],
    'HL1-ENCIENDE, PERO NO OPERA ':['SRC000-CAMBIO DE PIEZA'],/* Para problemas mecanicos */
    'HL1-ENCIENDE, PERO NO OPERA(DOOR)':['SRC000-CAMBIO DE PIEZA(DOOR)'],
    'HL1-ENCIENDE, PERO NO OPERA(S/W)':['SRC000-CAMBIO DE PIEZA(S/W)'],
    'HL1-ENCIENDE, PERO NO OPERA(IM)':['SRC000-CAMBIO DE PIEZA(IM)'],
    'HL1-ENCIENDE, PERO NO OPERA(COMPRESSOR)':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL2-OPERACION INTERMITENTE(COMPRESSOR)':['SRC000-CAMBIO DE PIEZA(COMPRESSOR)'],
    'HL1-ENCIENDE, PERO NO OPERA(PCB)':['SRC000-CAMBIO DE PIEZA(PCB)'],
    'HL1-ENCIENDE, PERO NO OPERA(m)':['SRC000-CAMBIO DE PIEZA(m)'],
    'HL2-OPERACION INTERMITENTE(m)':['SRC000-CAMBIO DE PIEZA(m)'],
    'HL2-OPERACION INTERMITENTE(PCB)':['SRC000-CAMBIO DE PIEZA(PCB)'],
    'HXB-CONEXION DE CABLE INCORRECTA':['SRC008-OTROS PROBLEMAS'],
    'HE2-ENFRIAMIENTO POBRE':['SRC000-CAMBIO DE PIEZA ','SRC008-OTROS PROBLEMAS '],
    'HE2-ENFRIAMIENTO POBRE(CONDENSER)':['SRC000-CAMBIO DE PIEZA(CONDENSER)'],
    'HE2-ENFRIAMINETO POBRE(SENSOR ELECTRONIC)':['SRC000-CAMBIO DE PIEZA(SENSOR ELECTRONIC)'],
    'HE3-ENFRIAMIENTO EXCESIVO*':['SRC002-AJUSTE/ALINEACION/CONFIGURACION*'],
    'HE3-ENFRIAMIENTO EXCESIVO(RT31)':['SRC001-REPARAR(RT31)'],
    'HE4-NO CONGELA':['SRC000-CAMBIO DE PIEZA',],
    'HE8-NO TRABAJA EL DESHIELO ':['SRC000-CAMBIO DE PIEZA '],
    'HE8-NO TRABAJA EL DESHIELO':['   SRC000-CAMBIO DE PIEZA '],
    'HH8-DESCONGELACION POBRE ':['SRC000-CAMBIO DE PIEZA '],
    'HH8-DESCONGELACION POBRE':['   SRC000-CAMBIO DE PIEZA '],
    'HE9-FUGA DE GAS(GAS LEAKAGE)':['SRC001-REPARAR(GAS LEAKAGE)'],
    'HE9-FUGA DE GAS':['SRC000-CAMBIO DE PIEZA(CONDENSER)'],
    'HE9-FUGA DE GAS(FI)':[SRC009],
    'HE9-FUGA DE GAS**':['SRC001-REPARAR**'],
    'HE9-FUGA DE GAS ':['SRC001-REPARAR'],/* Codigos para cierre por cambio de valvula de 3 vias */
    ' HE9-FUGA DE GAS ':['SRC008-OTROS PROBLEMAS'],
    'HF4-OBSTRUCCION DE TUBO DE ENTRADA':['SRC008-OTROS PROBLEMAS'],
    'HG1-NO AGITA':['SRC000-CAMBIO DE PIEZA'],
    'HG2-SIN SUMINISTRO DE AGUA':['SRC000-CAMBIO DE PIEZA(V)','SRC008-OTROS PROBLEMAS'],
    'HG2-SIN SUMINISTRO DE AGUA ':['SRC000-CAMBIO DE PIEZA','SRC008-OTROS PROBLEMAS'],
    'HG4-NO CENTRIFUGA':['SRC000-CAMBIO DE PIEZA(m)'],
    ' HG4-NO CENTRIFUGA ':['SRC000-CAMBIO DE PIEZA'],
    ' HG4-NO CENTRIFUGA  ':['SRC000-CAMBIO DE PIEZA '],
    'HG6-EXCESO DE AGUA':['SRC000-CAMBIO DE PIEZA'],
    'HG9-NO LAVA':['SRC000-CAMBIO DE PIEZA(p)'],
    'HLE-NO ROTA EL MOTOR':['SRC000-CAMBIO DE PIEZA'],
    'HLE-NO ROTA EL MOTOR(m)':['SRC000-CAMBIO DE PIEZA(m)'],
    ' HLE-NO ROTA EL MOTOR ':['SRC000-CAMBIO DE PIEZA(m)'],
    'HLG-NO ROTA EL VENTILADOR':['SRC000-CAMBIO DE PIEZA(p)'],
    'HLE-NO ROTA EL MOTOR ':['SRC000-CAMBIO DE PIEZA '],
    'HH6-COCINADO DISPAREJO':['SRC008-OTROS PROBLEMAS '],
    'HF7-FLUJO DE AGUA LENTO':['SRC000-CAMBIO DE PIEZA '],
    'HG4-NO CENTRIFUGA ':['SRC000-CAMBIO DE PIEZA'],
    'HC1-NO HAY CALEFACCION':['SRC000-CAMBIO DE PIEZA(p)'],
  };

  const options = repairOptions[selectedSubSymptom];
  const NDF = 'En el caso de los equipos que no tienen ningun problema de operacion o funcional, y el problema es causado por algun motivo ageno al equipo, como una mala instalacion (No tener las adecuaciones minimas indicadas en el manual de usuario), o un mal uso por parte del cliente, usaremos el codigo para NDF SRC008-OTROS PROBLEMAS'

  return (
    <div className={styles.container}>
      <h2>Seleccione el código de reparación para {selectedSubSymptom}</h2>
      {options ? (
        options.map((repairOption, Index) => (
          <div key={Index} >
            <button key={repairOption} onClick={() => onRepairSelect(repairOption)} className={styles.option} >{repairOption}</button>
            {repairOption === 'SRC008-OTROS PROBLEMAS' &&
             <div className={styles.ndf}>
              <h4>NDF '(No defecto)'</h4>
              <textarea value={NDF} className={styles.textTareaNDF} readOnly></textarea>
              </div>}
          </div>
        ))
      ) : (
        <p>No hay opciones disponibles para este síntoma.</p>
      )}
    </div>
  );
};

export default RepairCode;


