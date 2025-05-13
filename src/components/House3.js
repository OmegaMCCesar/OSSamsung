import  { useState, useEffect } from 'react';
import useFetchInfFirebase from '../hooks/useFetchInfFirebase';
import styles from '../styles/House3.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../configs/firebase'
import { doc, increment, runTransaction } from 'firebase/firestore';


const House2 = () => {
  // Estados para filtros y datos
  const navigate = useNavigate();
  
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetchInfFirebase(category, searchTerm);
  const { user } = useAuth()

  // Estados para las selecciones
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDefectBlock, setSelectedDefectBlock] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSubSymptom, setSelectedSubSymptom] = useState(null);
  const [selectedRepairCode, setSelectedRepairCode] = useState(null);
  const [selectedSubRepairCode, setSelectedSubRepairCode] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [ascCode, setAscCode] = useState('');


  const codes = [
        '1401501', '4907726', 
        '1658952', '1658994', '1659040', '4301958', '1659075', '1659136', '1729840', '1729975', '1729981', '1730172', '1730213', '1730257', '3453191', '2485007', '1730369', '3329308', '3490802', '3350595', '3375393', '3188990', '3329209', '3403522', '3404483', '3441335', '2277262', '3456937', '3464868', '3465902', '3467737', '3491791', '3861676', '6420071', '3903559', '4156881', '4156884', '4156883', '4160663', '4204348', '4243700', '4254175', '4271992', '3887111', '4292179', '4366954', '4375230', '4377174', '4789474', '4789476', '4894172', '4906330', '4923659', '4923680', '4932655', '4939874', '4953466', '4953467', '4962883', '4979868', '5777171', '5777172', '5779775', '5785173', '5788233', '5791986', '5798519', '5930135', '5939508', '5944496', '5949511', '5954013', '5968133', '5978055', '6423092', '6423093', '6423094', '5981427', '5984693', '5995041', '6421187', '6420072', '5999767', '6078654', '6082798', '4220824', '6162465', '4769819', '6205424', '6216903', '3491830', '6266448', '3191645', '5283007', '3865192', '2484362', '5288709', '6288721', '6288722', '6428335', '8334950', '8381572', '8395034', '9216816', '2470144','Cessoss','Sariwis'];
 
 // Verifica si el código ASC es válido
  const isValid = codes.includes(ascCode);
  showSummary && console.log(isValid)

        // Handlers para cambiar de etapa
  const handleModelClick = (model) => {
    setSelectedModel(model);
    // Reiniciamos las siguientes etapas
    setSelectedDefectBlock(null);
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false); };
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

    // --- NUEVO useEffect para la lógica de Firebase ---
  useEffect(() => {
    const updateAscCodeUsage = async () => {
      // Solo proceder si el código es válido, se muestra el resumen y ascCode tiene un valor
      if (isValid && showSummary && ascCode) {
        console.log(`Condiciones cumplidas: isValid=${isValid}, showSummary=${showSummary}, ascCode=${ascCode}`);
        const ascCodeRef = doc(db, "ascCodeUsage", ascCode); // Colección "ascCodeUsage", documento con ID = ascCode

        try {
          // Usar una transacción para asegurar la atomicidad de la operación (leer y luego escribir)
          await runTransaction(db, async (transaction) => {
            const ascDoc = await transaction.get(ascCodeRef);
            if (!ascDoc.exists()) {
              // Si el documento no existe, crearlo con 'uso' en 1
              transaction.set(ascCodeRef, {
                code: ascCode, // Guardamos el código también como un campo por si acaso
                usageCount: 1,
                lastUsed: new Date() // Opcional: guardar la última vez que se usó
              });
              console.log(`Firebase: Nuevo ascCode ${ascCode} registrado con uso 1.`);
            } else {
              // Si existe, incrementar 'uso'
              transaction.update(ascCodeRef, {
                usageCount: increment(1),
                lastUsed: new Date() // Opcional: actualizar la última vez que se usó
              });
              console.log(`Firebase: ascCode ${ascCode} actualizado. Nuevo uso: ${ascDoc.data().usageCount + 1}`);
            }
          });
        } catch (e) {
          console.error("Firebase: Error al actualizar el uso del ascCode: ", e);
          // Aquí podrías manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      } else {
         // console.log(`Condiciones NO cumplidas o ascCode vacío: isValid=${isValid}, showSummary=${showSummary}, ascCode=${ascCode}`);
      }
    };

    updateAscCodeUsage();

  }, [isValid, showSummary, ascCode]); // Dependencias del useEffect
  // --- FIN del NUEVO useEffect ---
  
  return (
    <div className={styles.container}>
      {!selectedModel && <div className={styles.cabezal}>
      <div className={styles.cabezalTitle}>
        <h2 className={styles.cabezalh2} >INGENIERIA LINEA BLANCA</h2>
        <h2  className={styles.cabezalh2}>TECHNICAL SUPPORT SEM-S</h2>
        </div>
        {user && user.email === 'luiscesar.munoz.cervantes.upiit@gmail.com' ? <>
            <Link to='/add' className={styles.button}>Añadir</Link>
          </>: null}
      <div className={styles.filters}>
        <Link className={styles.volver} to="/">volver</Link>
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
    
      <Link to='/búzon' className={styles.volver}>Búzon</Link>
      <div className={styles.filters2}>
      <input 
      className={styles.searchInput}
      placeholder="Ingresa codigo de centro de servicio"
      type="text"
      value={ascCode}
      onChange={(e) => setAscCode(e.target.value)} />
       <button onClick={() => setAscCode('')} className={styles.reiniciar}>
            Reiniciar
          </button>
      </div>
      {!isValid && <h2>"Primero, ingresa el código de tu centro de servicio para comenzar a usar la plataforma."</h2>}
       </div>}
      { isValid &&<div className={styles.results}>
        {loading && <div>Cargando...</div>}
        {error && <div>Error: {error.message}</div>}
        {showSummary && console.log(showSummary)}
        {/* Si se muestra el resumen, renderizamos la pantalla final */}
        {showSummary && (
          <div className={styles.summary}>
            <h2>Resumen de Selecciones</h2>
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
            <h2 className={styles.h2bloks} >Bloques de defecto para {selectedModel.productName}</h2>
            <p className={styles.h2bloks}>Seleccione la parte reemplazada por el técnico. Si se sustituyeron varias, elija la de mayor importancia.</p>
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
            <h2 className={styles.h2bloks} >Síntomas para {selectedDefectBlock.defectBlock}</h2>
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
            <h2 className={styles.h2bloks} >Sub-Síntomas para {selectedSymptom.symptomCode}</h2>
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
            <h2 className={styles.h2bloks} >Códigos de reparación para {selectedSubSymptom.subSymptomCode}</h2>
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
            <h2 className={styles.h2bloks} >Sub-Códigos de reparación para {selectedRepairCode.repairCode}</h2>
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
      </div>}
      {isValid === false && (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorMessage}>Código ASC no válido</h2>
          <p className={styles.errorDescription}>Por favor, verifica el código ingresado.</p>
        </div>
      )}
    </div>
  );
};

export default House2;



