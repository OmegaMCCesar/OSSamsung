import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useDefectBlocksByCategoryFromModels from '../hooks/useDefectBlocksByCategoryFromModels';
import styles from '../styles/EditModel.module.css';
import { db } from '../configs/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const EditModel = () => {
  const location = useLocation();
  const { modelData } = location.state;
  const { blocks: availableBlocks, loading, error } = useDefectBlocksByCategoryFromModels(modelData.category);

  const [formData, setFormData] = useState({
    category: modelData.category,
    productType: '',
    productName: modelData.productName,
    productModel: modelData.productModel,
    modelImageUrl: modelData.imagenes.modelo || '',
    defectBlock: '',
    defectBlockImageUrl: '',
    symptomCode: '',
    subSymptomCode: '',
    repairCode: '',
    subRepairCode: '',
  });

  const [symptomOptions, setSymptomOptions] = useState([]);
  const [subSymptomOptions, setSubSymptomOptions] = useState([]);
  const [repairCodeOptions, setRepairCodeOptions] = useState([]);
  const [subRepairCodeOptions, setSubRepairCodeOptions] = useState([]);
  const [expand, setExpand] = useState({});
  const [manual, setManual] = useState(false);

  const toggleBlock = (index) => {
    setExpand((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Función para comprobar si la combinación ya existe en el modelo
  const checkIfDuplicate = () => {
    if (!modelData.defectBlocks) return false;
    return modelData.defectBlocks.some((block) =>
      block.defectBlock === formData.defectBlock &&
      block.symptoms?.some((symptom) =>
        symptom.symptomCode === formData.symptomCode &&
        symptom.subSymptoms?.some((subSym) =>
          subSym.subSymptomCode === formData.subSymptomCode &&
          subSym.repairCodes?.some((repair) =>
            repair.repairCode === formData.repairCode &&
            repair.subRepairCodes.includes(formData.subRepairCode)
          )
        )
      )
    );
  };

  const duplicateExists = checkIfDuplicate();

  // Sección que muestra los defect blocks existentes en el modelo
  const renderExistingBlocks = () => {
    if (!modelData.defectBlocks || modelData.defectBlocks.length === 0) {
      return <p>No hay defect blocks en este modelo.</p>;
    }
    return (
      <ul className={`${styles.ulResume}`}>
        {modelData.defectBlocks.map((block, idx) => (
          <li
            className={ styles.card }
            key={idx}
            // Si se va a añadir un bloque ya existente, se pinta en rojo
            style={duplicateExists && block.defectBlock === formData.defectBlock ? { color: 'red' } : {}}
          >
            <button className={styles.toggleButton} onClick={() => toggleBlock(idx)}>
              {expand[idx] ? "🔽 Ocultar" : "▶️ Mostrar"} {block.defectBlock}
            </button>

            {expand[idx] && (
              <div onClick={() => toggleBlock(idx)} className={styles.cardContent}>
                <strong>Bloque:</strong> {block.defectBlock}
                <ul>
                  {block.symptoms &&
                    block.symptoms.map((symptom, sIdx) => (
                      <li key={sIdx}>
                        <strong>Síntoma:</strong> {symptom.symptomCode}
                        <ul>
                          {symptom.subSymptoms &&
                            symptom.subSymptoms.map((subSym, subIdx) => (
                              <li key={subIdx}>
                                <strong>Sub-Síntoma:</strong> {subSym.subSymptomCode}
                                <ul>
                                  {subSym.repairCodes &&
                                    subSym.repairCodes.map((repair, rIdx) => (
                                      <li key={rIdx}>
                                        <strong>Reparación:</strong> {repair.repairCode}
                                        <ul>
                                          {repair.subRepairCodes &&
                                            repair.subRepairCodes.map((subRepair, srIdx) => (
                                              <li key={srIdx}>
                                                <strong>Sub-Reparación:</strong> {subRepair}
                                              </li>
                                            ))}
                                        </ul>
                                      </li>
                                    ))}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };// Actualización de opciones según selección
  useEffect(() => {
    if (formData.defectBlock) {
      const selectedBlock = availableBlocks.find(block => block.defectBlock === formData.defectBlock);
  
      if (selectedBlock) {
        setSymptomOptions(selectedBlock.symptoms || []);
        setSubSymptomOptions(selectedBlock.subSymptoms || []);
        setRepairCodeOptions(selectedBlock.repairCodes || []);
        setSubRepairCodeOptions(selectedBlock.subRepairCodes || []);
        setFormData(prev => ({
          ...prev,
          defectBlockImageUrl: selectedBlock.defectBlockImageUrl || '',
        }));
      }
    }
  }, [formData.defectBlock, availableBlocks]);

  useEffect(() => {    
    if (formData.symptomCode) {
      const selectedSymptom = symptomOptions.find(symptom => symptom.symptomCode === formData.symptomCode);
      if (selectedSymptom) {
        setSubSymptomOptions(selectedSymptom.subSymptoms || []);
        setRepairCodeOptions([]);
        setSubRepairCodeOptions([]);
      }
    }
  }, [formData.symptomCode, symptomOptions]);

  useEffect(() => {
    if (formData.subSymptomCode) {
      const selectedSubSymptom = subSymptomOptions.find(subSymptom => subSymptom.subSymptomCode === formData.subSymptomCode);
      if (selectedSubSymptom) {
        setRepairCodeOptions(selectedSubSymptom.repairCodes || []);
        setSubRepairCodeOptions([]);
      }
    }
  }, [formData.subSymptomCode, subSymptomOptions]);

  useEffect(() => {
    if (formData.repairCode) {
      const selectedRepairCode = repairCodeOptions.find(repair => repair.repairCode === formData.repairCode);
      if (selectedRepairCode) {
        setSubRepairCodeOptions(selectedRepairCode.subRepairCodes || []);
      }
    }
  }, [formData.repairCode, repairCodeOptions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlockChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      defectBlock: value,
      defectBlockImageUrl: '',
      symptomCode: '',
      subSymptomCode: '',
      repairCode: '',
      subRepairCode: '',
    });
  };

  const handleSymptomChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      symptomCode: value,
      subSymptomCode: '',
      repairCode: '',
      subRepairCode: '',
    });
  };

  const handleSubSymptomChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      subSymptomCode: value,
      repairCode: '',
      subRepairCode: '',
    });
  };

  const handleRepairCodeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      repairCode: value,
      subRepairCode: '',
    });
  };

  const handleSubRepairCodeChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      subRepairCode: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      category,
      productType,
      productName,
      productModel,
      modelImageUrl,
      defectBlock,
      defectBlockImageUrl,
      symptomCode,
      subSymptomCode,
      repairCode,
      subRepairCode,
    } = formData;

    if (
      !category ||
      !productType ||
      !productName ||
      !productModel ||
      !modelImageUrl ||
      !defectBlock ||
      !defectBlockImageUrl ||
      !symptomCode ||
      !subSymptomCode ||
      !repairCode ||
      !subRepairCode
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (duplicateExists) {
      alert('La combinación de defectBlock, symptomCode, sub-symptomCode, repairCode y subRepairCode ya existe en este modelo.');
      return;
    }

    try {
      const modelDocRef = doc(db, 'products', category, 'tipos', productType, 'modelos', productModel);
      const modelDocSnap = await getDoc(modelDocRef);

      const newDefectBlock = {
        defectBlock,
        defectBlockImageUrl,
        symptoms: [
          {
            symptomCode,
            subSymptoms: [
              {
                subSymptomCode,
                repairCodes: [
                  {
                    repairCode,
                    subRepairCodes: [subRepairCode],
                  },
                ],
              },
            ],
          },
        ],
      };

      if (modelDocSnap.exists()) {
        const modelDataFirestore = modelDocSnap.data();
        let defectBlocks = modelDataFirestore.defectBlocks || [];
        let blockIndex = defectBlocks.findIndex(block => block.defectBlock === defectBlock);

        if (blockIndex !== -1) {
          let symptoms = defectBlocks[blockIndex].symptoms || [];
          let symptomIndex = symptoms.findIndex(sym => sym.symptomCode === symptomCode);

          if (symptomIndex !== -1) {
            let subSymptoms = symptoms[symptomIndex].subSymptoms || [];
            let subSymptomIndex = subSymptoms.findIndex(s => s.subSymptomCode === subSymptomCode);

            if (subSymptomIndex !== -1) {
              let repairCodes = subSymptoms[subSymptomIndex].repairCodes || [];
              let repairIndex = repairCodes.findIndex(r => r.repairCode === repairCode);

              if (repairIndex !== -1) {
                if (!repairCodes[repairIndex].subRepairCodes.includes(subRepairCode)) {
                  repairCodes[repairIndex].subRepairCodes.push(subRepairCode);
                }
              } else {
                repairCodes.push({ repairCode, subRepairCodes: [subRepairCode] });
              }
              subSymptoms[subSymptomIndex].repairCodes = repairCodes;
            } else {
              subSymptoms.push({ subSymptomCode, repairCodes: [{ repairCode, subRepairCodes: [subRepairCode] }] });
            }
            symptoms[symptomIndex].subSymptoms = subSymptoms;
          } else {
            symptoms.push({
              symptomCode,
              subSymptoms: [{ subSymptomCode, repairCodes: [{ repairCode, subRepairCodes: [subRepairCode] }] }],
            });
          }
          defectBlocks[blockIndex].symptoms = symptoms;
        } else {
          defectBlocks.push(newDefectBlock);
        }
        await updateDoc(modelDocRef, { defectBlocks });
      } else {
        await setDoc(modelDocRef, {
          productName,
          productModel,
          category,
          imagenes: { modelo: modelImageUrl },
          defectBlocks: [newDefectBlock],
          timestamp: new Date(),
        });
      }
      alert('Datos enviados correctamente');
    } catch (error) {
      console.error('Error al enviar datos: ', error);
    }
  };

  return !manual ? (
    <div className={styles.container}>
      <Link className={styles.atras} to="/3.0">
        atrás
      </Link>
      <button className={styles.manual} onClick={() => setManual(!manual)}>
        {manual ? 'Cerrar edicion Manual' : 'Abrir edicion Manual'}
      </button>
      <h2>Editar Modelo</h2> 
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Categoría:</label>
        <input type="text" value={formData.category} disabled />

        <label>Tipo de Producto:</label>
        <input
          type="text"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          className={styles.input}
        />

        <label>Nombre del Producto:</label>
        <input type="text" value={formData.productName} disabled />

        <label>Modelo del Producto:</label>
        <input type="text" value={formData.productModel} disabled />

        <label>Imagen del Modelo:</label>
        <input type="text" value={formData.modelImageUrl} disabled />

        <label>Bloque de Defecto:</label>
        {loading && <p>Cargando bloques...</p>}
        {error && <p>Error: {error.message}</p>}
        {availableBlocks.length > 0 ? (
          <select value={formData.defectBlock} onChange={handleBlockChange}>
            <option value="">Selecciona un bloque</option>
            {availableBlocks.map((block, idx) => (
              <option key={idx} value={block.defectBlock}>
                {block.defectBlock}
              </option>
            ))}
          </select>            
        ) : (
          <p>No hay bloques disponibles.</p>
        )}

        <label>Imagen del Bloque de Defecto:</label>
        <input type="text" value={formData.defectBlockImageUrl} disabled />

        <label>Código de Síntoma:</label>
        {symptomOptions.length > 0 ? (
          <select value={formData.symptomCode} onChange={handleSymptomChange}>
            <option value="">Selecciona un código de síntoma</option>
            {symptomOptions.map((symptom, idx) => (
              <option key={idx} value={symptom}>
                {symptom}
              </option>
            ))}
          </select>
        ) : (
          <p>No hay síntomas disponibles.</p>
        )}

        <label>Código de Sub-Síntoma:</label>
        {subSymptomOptions.length > 0 ? (
          <select value={formData.subSymptomCode} onChange={handleSubSymptomChange}>
            <option value="">Selecciona un sub-síntoma</option>
            {subSymptomOptions.map((subSym, idx) => (
              <option key={idx} value={subSym}>
                {subSym}
              </option>
            ))}
          </select>
        ) : (
          <p>No hay sub-síntomas disponibles.</p>
        )}

        <label>Código de Reparación:</label>
        {repairCodeOptions.length > 0 ? (
          <select value={formData.repairCode} onChange={handleRepairCodeChange}>
            <option value="">Selecciona un código de reparación</option>
            {repairCodeOptions.map((repair, idx) => (
              <option key={idx} value={repair}>
                {repair}
              </option>
            ))}
          </select>
        ) : (
          <p>No hay códigos de reparación disponibles.</p>
        )}

        <label>Código de Sub-Reparación:</label>
        {subRepairCodeOptions.length > 0 ? (
          <select value={formData.subRepairCode} onChange={handleSubRepairCodeChange}>
            <option value="">Selecciona un sub-código de reparación</option>
            {subRepairCodeOptions.map((subRepair, idx) => (
              <option key={idx} value={subRepair}>
                {subRepair}
              </option>
            ))}
          </select>
        ) : (
          <p>No hay sub-códigos de reparación disponibles.</p>
        )}
         {/* Mensaje de duplicado */}
      {duplicateExists && (
        <div className={styles.duplicateAlert}>
          <p>
            La combinación de <strong>Bloque de Defecto</strong>, <strong>Código de Síntoma</strong>, <strong>Sub-Síntoma</strong>, <strong>Código de Reparación</strong> y <strong>Sub-Reparación</strong> ya existe en este modelo.
          </p>
        </div>
      )}
        <button type="submit">Añadir bloque</button>
      </form>
      <div className={styles.existingBlocks}>
        <h3>Defect Blocks existentes en este modelo:</h3>
        {renderExistingBlocks()}
      </div>
    </div>
  ): (
  <div className={styles.container}>
    <Link className={styles.atras} to="/3.0">
    atras
    </Link>
    <button className={styles.manual} onClick={() => setManual(!manual)}>
        {manual ? 'Cerrar edicion Manual' : 'Abrir edicion Manual'}
      </button>
      <h2>Añadir bloque de codigo</h2>
      <div className={styles.subContainer}>
      <form>
      <h4>Categoría: {formData.category}</h4>
      <h4>Modelo: {formData.productModel}</h4>
      <label>Tipo de Producto:</label>
        <input
          type="text"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          className={styles.input}
        />
      <h4>Nombre del Producto: {formData.productName}</h4>
      <label>Bloque de defecto:</label>
      <input type="text" name="defectBlock" value={formData.defectBlock} onChange={handleBlockChange} />
      <label>Imagen del bloque de defecto:</label>
      <input type="text" name="defectBlockImageUrl" value={formData.defectBlockImageUrl} onChange={handleChange} />
      <label>Código de Síntoma:</label>
      <input type="text" name="symptomCode" value={formData.symptomCode} onChange={handleSymptomChange} />
      <label>Código de Sub-Síntoma:</label>
      <input type="text" name="subSymptomCode" value={formData.subSymptomCode} onChange={handleSubSymptomChange} />
      <label>Código de Reparación:</label>
      <input type="text" name="repairCode" value={formData.repairCode} onChange={handleRepairCodeChange} />
      <label>Código de Sub-Reparación:</label>
      <input type="text" name="subRepairCode" value={formData.subRepairCode} onChange={handleSubRepairCodeChange} />
      <button type="submit" onClick={handleSubmit}>Añadir bloque</button>
      </form>
      <div className={styles.imagesContainer}>
      <img className={styles.imageManual} src={formData.modelImageUrl} alt="Modelo" />
      {formData.defectBlockImageUrl.length > 0 && <img className={styles.imageManual} src={formData.defectBlockImageUrl} alt="Bloque de Defecto" />}
      </div>
      </div>
      <div className={styles.existingBlocks}>
        <h3>Defect Blocks existentes en este modelo:</h3>
        {renderExistingBlocks()}
      </div>
  </div>)
};

export default EditModel;


