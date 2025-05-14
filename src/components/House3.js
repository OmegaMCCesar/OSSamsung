import { useState, useEffect, useMemo } from 'react'; // Added useMemo
import useFetchInfFirebase from '../hooks/useFetchInfFirebase';
import styles from '../styles/House3.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../configs/firebase'
import { doc, increment, runTransaction } from 'firebase/firestore';

const House2 = () => {
  // --- State Management ---
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth context

  // States for filters and data fetching
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useFetchInfFirebase(category, searchTerm);

  // States for the multi-step selection process
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDefectBlock, setSelectedDefectBlock] = useState(null);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [selectedSubSymptom, setSelectedSubSymptom] = useState(null);
  const [selectedRepairCode, setSelectedRepairCode] = useState(null);
  const [selectedSubRepairCode, setSelectedSubRepairCode] = useState(null);

  // State to control summary visibility
  const [showSummary, setShowSummary] = useState(false);

  // State for ASC code input
  const [ascCode, setAscCode] = useState('');

  // Hardcoded list of valid ASC codes (Consider fetching this from Firebase if it grows large)
  const validAscCodes = useMemo(() => [
    'Techsup','1401501', '4907726',
    '1658952', '1658994', '1659040', '4301958', '1659075', '1659136', '1729840', '1729975', '1729981', '1730172', '1730213', '1730257', '3453191', '2485007', '1730369', '3329308', '3490802', '3350595', '3375393', '3188990', '3329209', '3403522', '3404483', '3441335', '2277262', '3456937', '3464868', '3465902', '3467737', '3491791', '3861676', '6420071', '3903559', '4156881', '4156884', '4156883', '4160663', '4204348', '4243700', '4254175', '4271992', '3887111', '4292179', '4366954', '4375230', '4377174', '4789474', '4789476', '4894172', '4906330', '4923659', '4923680', '4932655', '4939874', '4953466', '4953467', '4962883', '4979868', '5777171', '5777172', '5779775', '5785173', '5788233', '5791986', '5798519', '5930135', '5939508', '5944496', '5949511', '5954013', '5968133', '5978055', '6423092', '6423093', '6423094', '5981427', '5984693', '5995041', '6421187', '6420072', '5999767', '6078654', '6082798', '4220824', '6162465', '4769819', '6205424', '6216903', '3491830', '6266448', '3191645', '5283007', '3865192', '2484362', '5288709', '6288721', '6288722', '6428335', '8334950', '8381572', '8395034', '9216816', '2470144','Cessoss','Sariwis'
  ], []);

  // Derived state for ASC code validation
  const isAscCodeValid = useMemo(() => validAscCodes.includes(ascCode), [ascCode, validAscCodes]);

  // --- Handlers for Navigation/Selection Steps ---

  const handleModelClick = (model) => {
    setSelectedModel(model);
    // Reset subsequent selections
    setSelectedDefectBlock(null);
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleEditModel = (model) => {
    // Prevent default click behavior on the item div if editing is triggered
    // This function is called from a button inside the item, so the item's click handler might also fire.
    // If using a button, the event propagation might need stopping if it interferes.
    // Assuming the button click is handled separately and doesn't trigger handleModelClick.
    navigate(`/edit/${model.id}`, { state: { modelData: model } });
  };

  const handleDefectBlockClick = (block) => {
    setSelectedDefectBlock(block);
    // Reset subsequent selections
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);
    // Reset subsequent selections
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleSubSymptomClick = (subSymptom) => {
    setSelectedSubSymptom(subSymptom);
    // Reset subsequent selections
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleRepairCodeClick = (repair) => {
    setSelectedRepairCode(repair);
    // Reset subsequent selections
    setSelectedSubRepairCode(null);
    setShowSummary(false);
  };

  const handleSubRepairCodeClick = (subRepair) => {
    setSelectedSubRepairCode(subRepair);
    // At the end of the selection chain, show the summary
    setShowSummary(true);
  };

  // Function to reset all selections and return to the beginning
  const handleReset = () => {
    setSelectedModel(null);
    setSelectedDefectBlock(null);
    setSelectedSymptom(null);
    setSelectedSubSymptom(null);
    setSelectedRepairCode(null);
    setSelectedSubRepairCode(null);
    setShowSummary(false);
    // Optional: Reset ASC code as well, depending on desired flow
    // setAscCode('');
  };

  // Handler for the "Back" buttons
  const handleBack = (step) => {
    switch (step) {
      case 'model':
        handleReset(); // Go back to model selection (resets everything)
        break;
      case 'defectBlock':
        setSelectedDefectBlock(null);
        setSelectedSymptom(null);
        setSelectedSubSymptom(null);
        setSelectedRepairCode(null);
        setSelectedSubRepairCode(null);
        setShowSummary(false);
        break;
      case 'symptom':
        setSelectedSymptom(null);
        setSelectedSubSymptom(null);
        setSelectedRepairCode(null);
        setSelectedSubRepairCode(null);
        setShowSummary(false);
        break;
      case 'subSymptom':
        setSelectedSubSymptom(null);
        setSelectedRepairCode(null);
        setSelectedSubRepairCode(null);
        setShowSummary(false);
        break;
      case 'repairCode':
        setSelectedRepairCode(null);
        setSelectedSubRepairCode(null);
        setShowSummary(false);
        break;
      default:
        break;
    }
  };

  // --- Effect Hook for Firebase Logic (Tracking ASC Code Usage) ---
  useEffect(() => {
    // Only proceed if the ASC code is valid, the summary is shown, and ascCode has a value
    if (isAscCodeValid && showSummary && ascCode) {
      console.log(`Conditions met for logging usage: ASC Code=${ascCode}`);

      const ascCodeRef = doc(db, "ascCodeUsage", ascCode); // Collection "ascCodeUsage", document with ID = ascCode

      const updateUsage = async () => {
        try {
          // Use a transaction to ensure the operation is atomic (read then write)
          await runTransaction(db, async (transaction) => {
            const ascDoc = await transaction.get(ascCodeRef);
            if (!ascDoc.exists()) {
              // If the document doesn't exist, create it with 'usageCount' at 1
              transaction.set(ascCodeRef, {
                code: ascCode,
                usageCount: 1,
                lastUsed: new Date() // Optional: store last used timestamp
              });
              console.log(`Firebase: New ascCode ${ascCode} registered with usageCount 1.`);
            } else {
              // If it exists, increment 'usageCount'
              transaction.update(ascCodeRef, {
                usageCount: increment(1),
                lastUsed: new Date() // Optional: update last used timestamp
              });
              console.log(`Firebase: ascCode ${ascCode} updated. New usageCount: ${ascDoc.data().usageCount + 1}`);
            }
          });
        } catch (e) {
          console.error("Firebase: Error updating ascCode usage: ", e);
          // Handle the error, e.g., show a user-friendly message
        }
      };

      updateUsage();

      // IMPORTANT: The effect should only run ONCE when summary is shown for a VALID code.
      // Cleanup is not needed as this is a single action on selection completion.
      // The dependencies [isAscCodeValid, showSummary, ascCode] ensure it triggers correctly.
      // Adding a ref or state to track if usage was already logged for this specific selection path
      // could prevent potential double logs if state changes trigger the effect again unexpectedly,
      // but for this simple case triggered by `showSummary`, it's likely sufficient.

    } else {
       // console.log(`Conditions NOT met for logging usage: isValid=${isAscCodeValid}, showSummary=${showSummary}, ascCode=${ascCode}`);
    }
  }, [isAscCodeValid, showSummary, ascCode]); // Dependencias del useEffect. Added db as dependency although it's static.

  // --- Helper Function to Render Content Based on Selection Stage ---
  const renderContent = () => {
    if (loading) {
      return <div className={styles.message}>Cargando...</div>;
    }

    if (error) {
      return <div className={`${styles.message} ${styles.errorMessage}`}>Error: {error.message}</div>;
    }

    if (!isAscCodeValid && ascCode) {
       return (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorMessageTitle}>Código de centro de servicio no válido</h2>
          <p className={styles.errorDescription}>Por favor, verifica el código ingresado.</p>
        </div>
      );
    }

    if (!isAscCodeValid && !ascCode) {
       return (
        <div className={styles.messageContainer}>
          <p className={styles.initialMessage}>
            Primero, ingresa el código de tu centro de servicio para comenzar a usar la plataforma.
          </p>
        </div>
      );
    }


    // If ASC code is valid, proceed with the selection flow
    if (showSummary) {
      return (
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen de Selección</h2>
          <div className={styles.summaryDetails}>
             <p><strong>Modelo:</strong> {selectedModel?.productName}</p>
             <p><strong>Bloque de defecto:</strong> {selectedDefectBlock?.defectBlock}</p>
             <p><strong>Síntoma:</strong> {selectedSymptom?.symptomCode}</p>
             <p><strong>Sub-Síntoma:</strong> {selectedSubSymptom?.subSymptomCode}</p>
             <p><strong>Código de reparación:</strong> {selectedRepairCode?.repairCode}</p>
             <p><strong>Sub-Código de reparación:</strong> {selectedSubRepairCode}</p>
          </div>
          <button onClick={handleReset} className={styles.resetButton}>
            Reiniciar Selección
          </button>
        </div>
      );
    }

    if (selectedRepairCode) {
      // Display Sub-Repair Codes
      return (
        <div className={styles.selectionList}>
          <button onClick={() => handleBack('repairCode')} className={styles.backButton}>
            Volver a códigos de reparación
          </button>
          <h2 className={styles.selectionTitle}>Sub-Códigos de reparación para {selectedRepairCode.repairCode}</h2>
          {selectedRepairCode.subRepairCodes && selectedRepairCode.subRepairCodes.length > 0 ? (
            <ul className={styles.list}>
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
            <p className={styles.noResults}>No hay sub-códigos de reparación disponibles.</p>
          )}
        </div>
      );
    }

    if (selectedSubSymptom) {
      // Display Repair Codes
      return (
        <div className={styles.selectionList}>
          <button onClick={() => handleBack('subSymptom')} className={styles.backButton}>
            Volver a sub-síntomas
          </button>
          <h2 className={styles.selectionTitle}>Códigos de reparación para {selectedSubSymptom.subSymptomCode}</h2>
          {selectedSubSymptom.repairCodes && selectedSubSymptom.repairCodes.length > 0 ? (
            <ul className={styles.list}>
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
            <p className={styles.noResults}>No hay códigos de reparación disponibles.</p>
          )}
        </div>
      );
    }

    if (selectedSymptom) {
      // Display Sub-Symptoms
      return (
        <div className={styles.selectionList}>
          <button onClick={() => handleBack('symptom')} className={styles.backButton}>
            Volver a síntomas
          </button>
          <h2 className={styles.selectionTitle}>Sub-Síntomas para {selectedSymptom.symptomCode}</h2>
          {selectedSymptom.subSymptoms && selectedSymptom.subSymptoms.length > 0 ? (
            <ul className={styles.list}>
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
            <p className={styles.noResults}>No hay sub-síntomas disponibles.</p>
          )}
        </div>
      );
    }

    if (selectedDefectBlock) {
      // Display Symptoms
      return (
        <div className={styles.selectionList}>
          <button onClick={() => handleBack('defectBlock')} className={styles.backButton}>
            Volver a bloques de defecto
          </button>
          <h2 className={styles.selectionTitle}>Síntomas para {selectedDefectBlock.defectBlock}</h2>
          {selectedDefectBlock.symptoms && selectedDefectBlock.symptoms.length > 0 ? (
            <ul className={styles.list}>
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
            <p className={styles.noResults}>No hay síntomas disponibles.</p>
          )}
        </div>
      );
    }

    if (selectedModel) {
      // Display Defect Blocks
      return (
        <div className={styles.selectionList}>
          <button onClick={() => handleBack('model')} className={styles.backButton}>
            Volver a modelos
          </button>
          <h2 className={styles.selectionTitle}>Bloques de defecto para {selectedModel.productName}</h2>
          <p className={styles.selectionDescription}>Seleccione la parte reemplazada por el técnico. Si se sustituyeron varias, elija la de mayor importancia.</p>
          <div className={styles.gridList}> {/* Using grid for blocks */}
            {selectedModel.defectBlocks && selectedModel.defectBlocks.length > 0 ? (
              selectedModel.defectBlocks.map((block, index) => (
                <div
                  key={index}
                  className={styles.blockItem}
                  onClick={() => handleDefectBlockClick(block)}
                >
                  <p className={styles.blockTitle}><strong>Defecto:</strong> {block.defectBlock}</p>
                  {block.defectBlockImageUrl && (
                    <img
                      src={block.defectBlockImageUrl}
                      alt={block.defectBlock}
                      className={styles.itemImage}
                    />
                  )}
                </div>
              ))
            ) : (
              <p className={styles.noResults}>No hay bloques de defectos.</p>
            )}
          </div>
        </div>
      );
    }

    // Default: Display Model List (when nothing is selected)
    return (
      <div className={styles.modelList}>
        {Array.isArray(data) && data.length > 0 ? (
          <div className={styles.gridList}> {/* Using grid for models */}
            {data.map((item) => ( // Using item.id as key for better practice
              <div
                key={item.id} // Use unique item id as key
                className={styles.modelItem} // Specific class for model item
                 onClick={() => handleModelClick(item)} // Keep item click for selection
              >
                 {item.imagenes?.modelo && (
                   <img
                     className={styles.itemImage} // Reused image class
                     src={item.imagenes.modelo}
                     alt={item.productModel}
                   />
                 )}
                 {/* Optional: Display model name */}
                 {/* <p className={styles.modelName}>{item.productModel}</p> */}
                 {/* Button to edit, preventing parent click */}
                 {user && user.email === 'luiscesar.munoz.cervantes.upiit@gmail.com' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditModel(item); }} // Stop propagation
                      className={styles.editButton}
                    >
                      Editar
                    </button>
                  )}
              </div>
            ))
          }
          </div>
        ) : (
          <div className={styles.messageContainer}>
            <p className={styles.noResults}>No se encontraron resultados.</p>
          </div>
        )}
      </div>
    );
  };

  // --- Component Render ---
  return (
    <div className={styles.container}>
      {/* Header/Filters Area (Always visible or only when selecting model?)
          Keeping it visible when selecting model based on original code */}
      {!selectedModel && (
        <div className={styles.cabezal}>
          <div className={styles.cabezalTitle}>
            <h1 className={styles.cabezalh1}>INGENIERIA LINEA BLANCA</h1> {/* Changed to h1 for semantics */}
            <h2 className={styles.cabezalh2}>TECHNICAL SUPPORT SEM-S</h2>
          </div>

          {/* Admin Add Button */}
          {user && user.email === 'luiscesar.munoz.cervantes.upiit@gmail.com' && (
             <Link to='/add' className={styles.addButton}>Añadir</Link>
          )}

          {/* Search and Category Filters */}
          <div className={styles.filters}>
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
            <Link to='/búzon' className={styles.buzonButton}>Búzon</Link> {/* Changed class name */}
             <Link className={styles.volverButton} to="/">volver</Link> {/* Changed class name */}
            <input
              type="text"
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar modelo"
            />
          </div>

          {/* Buzon Link */}

          {/* ASC Code Input and Reset */}
          <div className={styles.ascCodeInputContainer}> {/* New container class */}
            <input
              className={`${styles.searchInputAsc} ${!isAscCodeValid && ascCode ? styles.inputInvalid : ''}`} 
              placeholder="Ingresa código de centro de servici aqui"
              type="text"
              value={ascCode}
              onChange={(e) => setAscCode(e.target.value)}
              disabled={isAscCodeValid} // Disable input once a valid code is entered
            />
             {/* Show reset button only if code is entered */}
            {ascCode && (
              <button onClick={() => setAscCode('')} className={styles.resetAscButton}> {/* Changed class name */}
                Reiniciar Código
              </button>
            )}
          </div>
           {/* Removed the initial validation message from here, now handled in renderContent */}
        </div>
      )}

      {/* Main content area - Render based on validation and selection stage */}
      <div className={styles.contentArea}>
          {renderContent()}
      </div>

    </div>
  );
};

export default House2;