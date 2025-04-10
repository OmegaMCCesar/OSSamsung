// src/App.js
import React, { useState } from 'react';
import House from './House';
import BlockSelection from './BlockSelection';
import SymptomBlock from './SymptomBlock';
import SubSymptom from './SubSymptom';
import RepairCode from './RepairCode';
import FinalRepairOptions from './FinalRepairOptions';
import FinalSummary from './FinalSummary';
import BackToHomeButton from './BackToHomeButton';

const Bridge = () => {



  const [selections, setSelections] = useState({
    equipment: null,
    block: null,
    symptomBlock: null,
    subSymptom: null,
    repairCode: null,
    finalRepair: null,
  });
  
  const [showFinalSummary, setShowFinalSummary] = useState(false);

 

  const handleSelectEquipment = (equipment) => {
    setSelections({ equipment, block: null, symptomBlock: null, subSymptom: null, repairCode: null, finalRepair: null });
    setShowFinalSummary(false);
  };

  const handleSelectBlock = (block) => {
    setSelections((prev) => ({ ...prev, block }));
  };

  const handleSelectSymptomBlock = (symptomBlock) => {
    setSelections((prev) => ({ ...prev, symptomBlock }));
  };

  const handleSelectSubSymptom = (subSymptom) => {
    setSelections((prev) => ({ ...prev, subSymptom }));
  };

  const handleSelectRepairCode = (repairCode) => {
    setSelections((prev) => ({ ...prev, repairCode }));
  };

  const handleSelectFinalRepair = (finalRepair) => {
    setSelections((prev) => ({ ...prev, finalRepair }));
    setShowFinalSummary(true); // Mostrar el resumen final al completar el flujo
  };

  const handleBackToHome = () => {
    setSelections({ equipment: null, block: null, symptomBlock: null, subSymptom: null, repairCode: null, finalRepair: null });
    setShowFinalSummary(false);
  };

  return (
   
    <div>
      {!showFinalSummary && (
        <>
          {!selections.equipment && <House onSelect={handleSelectEquipment} />}
          {selections.equipment && !selections.block && (
            <BlockSelection selectedEquipment={selections.equipment} onBlockSelect={handleSelectBlock} />
          )}
          {selections.block && !selections.symptomBlock && (
            <SymptomBlock selectedBlock={selections.block} onSymptomSelect={handleSelectSymptomBlock} />
          )}
          {selections.symptomBlock && !selections.subSymptom && (
            <SubSymptom selectedSymptom={selections.symptomBlock} onSubSymptomSelect={handleSelectSubSymptom} />
          )}
          {selections.subSymptom && !selections.repairCode && (
            <RepairCode selectedSubSymptom={selections.subSymptom} onRepairSelect={handleSelectRepairCode} />
          )}
          {selections.repairCode && !selections.finalRepair && (
            <FinalRepairOptions selectedRepairCode={selections.repairCode} onFinalSelect={handleSelectFinalRepair} />
          )}
        </>
      )}
      {showFinalSummary && (
        <FinalSummary selections={selections} onBackToHome={handleBackToHome} />
      )}
      {selections.equipment !== null && <BackToHomeButton onBackToHome={handleBackToHome} />}
    </div>
  );
}

export default Bridge