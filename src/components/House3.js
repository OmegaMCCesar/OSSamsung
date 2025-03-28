import React, { useState } from 'react';
import useFetchInfFirebase from '../hooks/useFetchInfFirebase';
import styles from '../styles/House3.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const House2 = () => {
  // Estados para filtros y datos
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetchInfFirebase(category, searchTerm);
  const { user } = useAuth();

  
  

  // Estados para las selecciones
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDefectBlock, setSelectedDefectBlock] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSubSymptom, setSelectedSubSymptom] = useState(null);
  const [selectedRepairCode, setSelectedRepairCode] = useState(null);
  const [selectedSubRepairCode, setSelectedSubRepairCode] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  
  // Handlers para cambiar de etapa
  const handleModelClick = (model) => {
    setSelectedModel(model);
    // Reiniciamos las siguientes etapas
    setSelectedDefectBlock(null);
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);

   
  };
  const handleEditModel = (model) => {
    navigate(`/edit/${model.id}`, { state: { modelData: model } });
  }

  const handleDefectBlockClick = (block) => {
    setSelectedDefectBlock(block);
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleSubSymptomClick = (subSymptom) => {
    setSelectedSubSymptom(subSymptom);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleRepairCodeClick = (repair) => {
    setSelectedRepairCode(repair);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleSubRepairCodeClick = (subRepair) => {
    setSelectedSubRepairCode(subRepair);
    // Al seleccionar el sub-reparación final, mostramos el resumen
    setShowSummary(true);
  };

  // Función para reiniciar todas las selecciones y volver al inicio
  const handleReset = () => {
    setSelectedModel(null);
    setSelectedDefectBlock(null);
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Link className={styles.volver} to="/Bridge">volver</Link>
        <input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar modelo"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className={styles.categorySelect}
        >
          <option value="">Todas las categorías</option>
          <option value="REF">REF</option>
          <option value="WSM">WSM</option>
          <option value="DRY">DRY</option>
          <option value="MWO">MWO</option>
          <option value="COOK">COOK</option>
          <option value="OVEN">OVEN</option>
          <option value="ACN">ACN</option>
          <option value="VACUM">VACUM</option>
          <option value="DW">DW</option>
          <option value="AIR DRESSER">AIR DRESSER</option>
        </select>
      </div>
      <p className={styles.anuncio}>Los modelos aún se están agregando. En esta sección podrá buscar por el modelo, categoría y tipo. Si aún no aparece el modelo que necesita, envíe su modelo y cuál es su duda al buzon de abajo.</p>
      <Link to='/búzon' className={styles.volver}>Búzon</Link>

      <div className={styles.results}>
        {loading && <div>Cargando...</div>}
        {error && <div>Error: {error.message}</div>}

        {/* Si se muestra el resumen, renderizamos la pantalla final */}
        {showSummary && (
          <div className={styles.summary}>
            <h2>Resumen de Selecciones</h2>
            <p>
              <strong>Modelo:</strong> {selectedModel?.productModel} - {selectedModel?.productName}
            </p>
            <p>
              <strong>Bloque de defecto:</strong> {selectedDefectBlock?.defectBlock}
            </p>
            <p>
              <strong>Síntoma:</strong> {selectedSymptom?.symptomCode}
            </p>
            <p>
              <strong>Sub-Síntoma:</strong> {selectedSubSymptom?.subSymptomCode}
            </p>
            <p>
              <strong>Código de reparación:</strong> {selectedRepairCode?.repairCode}
            </p>
            <p>
              <strong>Sub-Código de reparación:</strong> {selectedSubRepairCode}
            </p>
            <button onClick={handleReset} className={styles.resetButton}>
              Reiniciar Selección
            </button>
          </div>
        )}

        {/* Etapas de selección: solo se muestra lo que aún no ha sido seleccionado */}
        {!selectedModel && !showSummary && (
          <div className={styles.modelList}>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => handleModelClick(item)}
                >
                  <p><strong>Nombre:</strong> {item.productName}</p>
                  <p><strong>Modelo:</strong> {item.productModel}</p>
                  {item.imagenes?.modelo && (
                    <img
                      className={styles.img}
                      src={item.imagenes.modelo}
                      alt={item.productModel}
                    />
                  )}
                   <div className={styles.buttonContainer}>
                    { user ? <button onClick={() => handleEditModel(item)} className={styles.editButton}>
                      Editar
                    </button> : null}
                  </div>
                </div>
              ))
            ) : (
              <div>No se encontraron resultados.</div>
            )}
          </div>
        )}

        {selectedModel && !selectedDefectBlock && !showSummary && (
          <div className={styles.defectBlockList}>
            <button onClick={handleReset} className={styles.backButton}>
              Volver a modelos
            </button>
            <h2>Bloques de defecto para {selectedModel.productModel}</h2>
            <div className={styles.containerBlocks} >
            {selectedModel.defectBlocks && selectedModel.defectBlocks.length > 0 ? (
              selectedModel.defectBlocks.map((block, index) => (
                <div
                  key={index}
                  className={styles.block}
                  onClick={() => handleDefectBlockClick(block)}
                >
                  <p><strong>Defecto:</strong> {block.defectBlock}</p>
                  {block.defectBlockImageUrl && (
                    <img
                      src={block.defectBlockImageUrl}
                      alt={block.defectBlock}
                      className={styles.img}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>No hay bloques de defectos.</p>
            )}
            </ div>
          </div>
        )}

        {selectedDefectBlock && !selectedSymptom && !showSummary && (
          <div className={styles.symptomCodeList}>
            <button onClick={() => setSelectedDefectBlock(null)} className={styles.backButton}>
              Volver a bloques de defecto
            </button>
            <h2>Síntomas para {selectedDefectBlock.defectBlock}</h2>
            {selectedDefectBlock.symptoms && selectedDefectBlock.symptoms.length > 0 ? (
              <ul>
                {selectedDefectBlock.symptoms.map((symptom, symIndex) => (
                  <li
                    key={symIndex}
                    onClick={() => handleSymptomClick(symptom)}
                    className={styles.clickableItem}
                  >
                    <strong>Síntoma:</strong> {symptom.symptomCode}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay síntomas disponibles.</p>
            )}
          </div>
        )}

        {selectedSymptom && !selectedSubSymptom && !showSummary && (
          <div className={styles.subSymptomCodeList}>
            <button onClick={() => setSelectedSymptom(null)} className={styles.backButton}>
              Volver a síntomas
            </button>
            <h2>Sub-Síntomas para {selectedSymptom.symptomCode}</h2>
            {selectedSymptom.subSymptoms && selectedSymptom.subSymptoms.length > 0 ? (
              <ul>
                {selectedSymptom.subSymptoms.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => handleSubSymptomClick(sub)}
                    className={styles.clickableItem}
                  >
                    <strong>Sub-Síntoma:</strong> {sub.subSymptomCode}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay sub-síntomas disponibles.</p>
            )}
          </div>
        )}

        {selectedSubSymptom && !selectedRepairCode && !showSummary && (
          <div className={styles.repairCodeList}>
            <button onClick={() => setSelectedSubSymptom(null)} className={styles.backButton}>
              Volver a sub-síntomas
            </button>
            <h2>Códigos de reparación para {selectedSubSymptom.subSymptomCode}</h2>
            {selectedSubSymptom.repairCodes && selectedSubSymptom.repairCodes.length > 0 ? (
              <ul>
                {selectedSubSymptom.repairCodes.map((repair, repIndex) => (
                  <li
                    key={repIndex}
                    onClick={() => handleRepairCodeClick(repair)}
                    className={styles.clickableItem}
                  >
                    <strong>Reparación:</strong> {repair.repairCode}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay códigos de reparación disponibles.</p>
            )}
          </div>
        )}

        {selectedRepairCode && !selectedSubRepairCode && !showSummary && (
          <div className={styles.subRepairCodeList}>
            <button onClick={() => setSelectedRepairCode(null)} className={styles.backButton}>
              Volver a códigos de reparación
            </button>
            <h2>Sub-Códigos de reparación para {selectedRepairCode.repairCode}</h2>
            {selectedRepairCode.subRepairCodes && selectedRepairCode.subRepairCodes.length > 0 ? (
              <ul>
                {selectedRepairCode.subRepairCodes.map((subRep, subRepIndex) => (
                  <li
                    key={subRepIndex}
                    onClick={() => handleSubRepairCodeClick(subRep)}
                    className={styles.clickableItem}
                  >
                    {subRep}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay sub-códigos de reparación disponibles.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default House2;



