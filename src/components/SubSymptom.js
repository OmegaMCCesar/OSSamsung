// src/components/SubSymptom.js
import React from 'react';
import styles from '../styles/SubSymptom.module.css';





const SubSymptom = ({ selectedSymptom, onSubSymptomSelect }) => {

const HL1 = ' HL1-ENCIENDE, PERO NO OPERA ';
const HL2 = 'HL2-OPERACION INTERMITENTE ';
const C94 = 'C94-DOOR ALIGMENT';
const C94P = 'C94P-DOOR ALIGMENT ';



  const subSymptoms = {
    'SRC002-AJUSTE/ALINEACION/CONFIGURACION ':[C94P],
    'SRC002-AJUSTE/ALINEACION/CONFIGURACION':[C94],
    'SRC003-LIMPIEZA': ['D12-FILTER CLEANING'],
    'SRC008-OTROS PROBLEMAS':['HE4-NO CONGELA'],
    'SRC013-PROBLEMAS DE OPERACION  ': [HL1, HL2,],
    ' SRC013-PROBLEMA DE OPERACION ' : [HL1, HL2,],
    'FAUNA ENCONTRADA EN EQUIPO':[],
    'SRC011-PROBLEMAS COSMETICOS':['A46-CAMBIO DE PARTES COSMETICAS(SOLICITUD DEL CLIENTE)','HN1-MARCA, ABOLLADURA','HN2-ESPACIO, HUECO','HN3-DEFORMACION','HN4-DECOLORACION','HN6-PARTES SEPARADAS','HN7-PINTURA DESPEGADA','HN8-OXIDADO','HNG-RASGUÑADO'],
    'SRC015-RUIDO':['HK1-RUIDO DE MOTOR'],
    '  SRC021-CALENTAMIENTO/REFRIGERACION   ':['HE8-NO TRABAJA EL DESHIELO ','HH8-DESCONGELACION POBRE '],
    'SRC021-CALENTAMIENTO/REFRIGERACION(bimetal)':['HE8-NO TRABAJA EL DESHIELO','HH8-DESCONGELACION POBRE'],
    '  SRC021-CALENTAMIENTO/REFRIGERACION  ':['HE8-NO TRABAJA EL DESHIELO','HH8-DESCONGELACION POBRE'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(GO)':['HH6-COCINADO DISPAREJO'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(CONDENSER)':['HE2-ENFRIAMIENTO POBRE(CONDENSER)'],
    'SRC021-CALENTAMIENTO/REFRIGERACION':['HE2-ENFRIAMIENTO POBRE'],
    'SRC021-CALENTAMIENTO/REFRIGERACION.':['HC1-NO HAY CALEFACCION.','HC2-CALEFACCION DEBIL.','HC3-CALEFACCION EXCESIVA.'],
    ' SRC022-FUGA/FUGA ':[' HE9-FUGA DE GAS '],
    '  SRC022-FUGA/FUGA  ':['HG6-EXCESO DE AGUA '],
    'SRC022-FUGA/FUGA**':['HE9-FUGA DE GAS**'],
    'SRC022-FUGA/FUGA':['HE9-FUGA DE GAS'],
    'SRC022-FUGA/FUGA(FUGA INTERNA)':['HE9-FUGA DE GAS(FI)'],
    'SRC022-FUGA/FUGA(GAS LEAKAGE)':['HE9-FUGA DE GAS(GAS LEAKAGE)'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(WD)':['HC1-NO HAY CALEFACCION'],
    'SRC021-CALENTAMIENTO/REFRIGERACION ':['HC1-NO HAY CALEFACCION ','HC2-CALEFACCION DEBIL '],
    ' SRC021-CALENTAMIENTO/REFRIGERACION':['HE2-ENFRIAMIENTO POBRE'],
    'SRC021-CALENTAMIENTO/REFRIGERACION   ':['HC2-CALEFACCION DEBIL'],
    'SRC021-CALENTAMIENTO/REFRIGERACION*':['HE3-ENFRIAMIENTO EXCESIVO*'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(RT31)':['HE3-ENFRIAMIENTO EXCESIVO(RT31)'],
    'SRC021-CALENTAMIENTO/REFRIGERACION(SENSOR ELECTRONIC)':['HE2-ENFRIAMINETO POBRE(SENSOR ELECTRONIC)'],
    'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR)':['HA1-NO ENCIENDE(COMPRESSOR)'],
    'SRC012-PROBLEMAS DE ENCENDIDO(COMPRESSOR*)':['HA1-NO ENCIENDE(COMPRESSOR*)'],
    'SRC012-PROBLEMAS DE ENCENDIDO':['HA1-NO ENCIENDE(M)'],
    'SRC012-PROBLEMAS DE ENCENDIDO(PCB DISPLAY)':['HA1-NO ENCIENDE'],
    'SRC012-PROBLEMAS DE ENCENDIDO(m)':['HA1-NO ENCIENDE(m)'],
    'SRC012-PROBLEMAS DE ENCENDIDO ':['HA1-NO ENCIENDE '],
    ' SRC012-PROBLEMAS DE ENCENDIDO ':['HA1-NO ENCIENDE  '],
    ' SRC012-PROBLEMAS DE ENCENDIDO  ':['  HA1-NO ENCIENDE  '],/* Para cambio de PCB */
    'SRC013-PROBLEMAS DE OPERACION.':['HA1-NO ENCIENDE.'],
    '  SRC013-PROBLEMAS DE OPERACION  ':['HL1-ENCIENDE, PERO NO OPERA '],/* Para problemas de partes mecanicas */
    'SRC013-PROBLEMAS DE OPERACION':['HL1-ENCIENDE, PERO NO OPERA','HL2-OPERACION INTERMITENTE'],
    ' SRC013-PROBLEMAS DE OPERACION ':['HLJ-DIRECCION DE GIRO NO AJUSTADO'],
    '  SRC013-PROBLEMAS DE OPERACION ':['HG9-NO LAVA '],
    'SRC013-PROBLEMAS DE OPERACION(DOOR)':['HL1-ENCIENDE, PERO NO OPERA(DOOR)'],
    'SRC013-PROBLEMAS DE OPERACION**':['HG1-NO AGITA'],
    'SRC013-PROBLEMAS DE OPERACION*':['HG9-NO LAVA'],
    'SRC013-PROBLEMAS DE OPERACION(P)':['HG9-NO LAVA'],
    'SRC013-PROBLEMAS DE OPERACION(S/W)':['HL1-ENCIENDE, PERO NO OPERA(S/W)'],
    'SRC013-PROBLEMAS DE OPERACION(COMPRESSOR)':['HLC-NO FUNCIONA EL COMPRESSOR','HL1-ENCIENDE, PERO NO OPERA(COMPRESSOR)','HL2-OPERACION INTERMITENTE(COMPRESSOR)'],
    'SRC013-PROBLEMAS DE OPERACION(PCB)':['HL1-ENCIENDE, PERO NO OPERA(PCB)','HL2-OPERACION INTERMITENTE(PCB)'],
    'SRC013-PROBLEMAS DE OPERACION(IM)':['HL1-ENCIENDE, PERO NO OPERA(IM)'],
    'SRC013-PROBLEMAS DE OPERACION(m)':['HL1-ENCIENDE, PERO NO OPERA(m)','HL2-OPERACION INTERMITENTE(m)'],
    'SRC013-PROBLEMAS DE OPERACION   ':['HLJ-DIRECCION DE JIRO NO AJUSTADO'],
    'SRC013-PROBLEMAS DE OPERACION ':['HL1-ENCIENDE, PERO NO OPERA'],
    'SRC015-RUIDO ':['AC1-RUIDO MECANICO'],
    ' SRC015-RUIDO ':['HKD-RUIDO DE DRENADO'],
    'SRC019-PROBLEMAS DE CONEXION':['HXB-CONEXION DE CABLE INCORRECTA'],
    ' SRC022-FUGA/FUGA  ':['HE9-FUGA DE GAS '],
    'SRC022-FUGA/FUGA ':['HG6-EXCESO DE AGUA'],
    'SRC029-PROVEDOR DE AGUA ':['HG2-SIN SUMINISTRO DE AGUA '],
    'SRC029-PROVEDOR DE AGUA':['HG2-SIN SUMINISTRO DE AGUA'],
    'SRC029-PROVEEDOR DE AGUA ':['HF7-FLUJO DE AGUA LENTO'],
    'SRC029-PROVEEDOR DE AGUA':['HG2-SIN SUMINISTRO DE AGUA'],
    'SRC029-PROVEEDOR DE AGUA(HDW)':['HF4-OBSTRUCCION DE TUBO DE ENTRADA'],
    'SRC030-PROBLEMA DE ROTACION ':['HLE-NO ROTA EL MOTOR'],
    'SRC030-PROBLEMAS DE ROTACION':['HLE-NO ROTA EL MOTOR'],
    'SRC030-PROBLEMA DE ROTACION':['HG4-NO CENTRIFUGA'],
    'SRC030-PROBLEMA DE ROTACION  ':['HLG-NO ROTA EL VENTILADOR'],
    'SRC030-PROBLEMA DE ROTACION(D)':['HLE-NO ROTA EL MOTOR'],
    'SRC030-PROBLEMA DE ROTACION(MF)':['HLG-NO ROTA EL VENTILADOR'],
    'SRC030-PROBLEMAS DE ROTACION(m)':['HLE-NO ROTA EL MOTOR(m)'],
    'SRC030-PROBLEMA DE ROTACION    ':[' HG4-NO CENTRIFUGA  '],
    'SRC030-PROBLEMAS DE ROTACION   ':['HG4-NO CENTRIFUGA '],
    'SRC030-PROBLEMAS DE ROTACION    ':['HG4-NO CENTRIFUGA '],
    'SRC030-PROBLEMAS DE ROTACION ':['HLE-NO ROTA EL MOTOR '],
    ' SRC030-PROBLEMA DE ROTACION ':['HLG-NO ROTA EL VENTILADOR'],
    ' SRC030-PROBLEMA DE ROTACION  ':[' HLE-NO ROTA EL MOTOR ']
  };

  return (
    <div className={styles.container}>
      <h2>Seleccione el sub-síntoma para {selectedSymptom}</h2>
      {subSymptoms[selectedSymptom].map((subSymptom) => (
        <div key={subSymptom} onClick={() => onSubSymptomSelect(subSymptom)} className={styles.option}>
          <button >{subSymptom}</button>
        </div>
      ))}
    </div>
  );
};

export default SubSymptom;

