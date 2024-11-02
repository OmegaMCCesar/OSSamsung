// src/App.js
import React, { useState } from 'react';
import PartSelection from './components/PartSelection';
import SymptomCode from './components/SymptomCode';
import InterimCode from './components/InterimCode';
import RepairCode from './components/RepairCode';
import FinalOptions from './components/FinalOptions';
import SelectionSummary from './components/SelectionSummary';
import BackToHomeButton from './components/BackToHomeButton';
import HomeO from './components/HomeO';

function App() {
  const [selections, setSelections] = useState({
    equipment: null,
    part: null,
    symptom: null,
    interim: null,
    repair: null,
    final: null,
  });

  const handleSelectEquipment = (equipment) => {
    setSelections({ equipment, part: null, symptom: null, interim: null, repair: null, final: null });
  };

  const handleSelectPart = (part) => {
    setSelections((prev) => ({ ...prev, part }));
  };

  const handleSelectSymptom = (symptom) => {
    setSelections((prev) => ({ ...prev, symptom }));
  };

  const handleSelectInterim = (interim) => {
    setSelections((prev) => ({ ...prev, interim }));
  };

  const handleSelectRepair = (repair) => {
    setSelections((prev) => ({ ...prev, repair }));
  };

  const handleSelectFinal = (final) => {
    setSelections((prev) => ({ ...prev, final }));
  };

  const handleBackToHome = () => {
    setSelections({ equipment: null, part: null, symptom: null, interim: null, repair: null, final: null });
  };

  return (
    <div>
      <SelectionSummary selections={selections} />
      {!selections.equipment && (
        <HomeO onSelect={handleSelectEquipment} />
      )}
      {selections.equipment && !selections.part && (
        <PartSelection selectedEquipment={selections.equipment} onPartSelect={handleSelectPart} />
      )}
      {selections.part && !selections.symptom && (
        <SymptomCode onSymptomSelect={handleSelectSymptom} />
      )}
      {selections.symptom && !selections.interim && (
        <InterimCode selectedSymptom={selections.symptom} onInterimSelect={handleSelectInterim} />
      )}
      {selections.interim && !selections.repair && (
        <RepairCode selectedSymptom={selections.symptom} onRepairSelect={handleSelectRepair} />
      )}
      {selections.repair && (
        <FinalOptions selectedRepair={selections.repair} onFinalSelect={handleSelectFinal} />
      )}
      <BackToHomeButton onBackToHome={handleBackToHome} />
    </div>
  );
}

export default App;





