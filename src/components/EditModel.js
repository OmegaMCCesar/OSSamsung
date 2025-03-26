import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    subRepairCode: ''
  });

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlockChange = (e) => {
    const selectedBlock = availableBlocks.find(block => block.defectBlock === e.target.value);
    
    if (selectedBlock) {
      const firstSymptom = selectedBlock.symptoms?.[0] || {};
      const firstSubSymptom = firstSymptom.subSymptoms?.[0] || {};
      const firstRepairCode = firstSubSymptom.repairCodes?.[0] || {};
      const firstSubRepairCode = firstRepairCode.subRepairCodes?.[0] || '';

      setFormData({
        ...formData,
        defectBlock: selectedBlock.defectBlock,
        defectBlockImageUrl: selectedBlock.defectBlockImageUrl || '',
        symptomCode: firstSymptom.symptomCode || '',
        subSymptomCode: firstSubSymptom.subSymptomCode || '',
        repairCode: firstRepairCode.repairCode || '',
        subRepairCode: firstSubRepairCode || ''
      });
    }
    
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

    // Validación de campos obligatorios
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

    try {
      // Construir la referencia del documento del modelo dentro de la colección correspondiente
      const modelDocRef = doc(
        db,
        'products',
        category,
        'tipos',
        productType,
        'modelos',
        productModel
      );
      const modelDocSnap = await getDoc(modelDocRef);

      // Estructura del nuevo bloque de defecto con sus datos anidados
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
        // Si el modelo ya existe, obtenemos sus defectBlocks (o creamos un array vacío)
        const modelData = modelDocSnap.data();
        let defectBlocks = modelData.defectBlocks || [];

        // Buscamos si el bloque de defecto ya existe
        let blockIndex = defectBlocks.findIndex(
          (block) => block.defectBlock === defectBlock
        );

        if (blockIndex !== -1) {
          // Si existe, actualizamos sus síntomas
          let symptoms = defectBlocks[blockIndex].symptoms || [];

          let symptomIndex = symptoms.findIndex(
            (sym) => sym.symptomCode === symptomCode
          );

          if (symptomIndex !== -1) {
            let subSymptoms = symptoms[symptomIndex].subSymptoms || [];
            let subSymptomIndex = subSymptoms.findIndex(
              (subSym) => subSym.subSymptomCode === subSymptomCode
            );

            if (subSymptomIndex !== -1) {
              let repairCodes = subSymptoms[subSymptomIndex].repairCodes || [];
              let repairIndex = repairCodes.findIndex(
                (repair) => repair.repairCode === repairCode
              );

              if (repairIndex !== -1) {
                // Si el código de reparación ya existe, agregamos el sub-reparación si no existe
                if (!repairCodes[repairIndex].subRepairCodes.includes(subRepairCode)) {
                  repairCodes[repairIndex].subRepairCodes.push(subRepairCode);
                }
              } else {
                repairCodes.push({ repairCode, subRepairCodes: [subRepairCode] });
              }
              subSymptoms[subSymptomIndex].repairCodes = repairCodes;
            } else {
              subSymptoms.push({
                subSymptomCode,
                repairCodes: [{ repairCode, subRepairCodes: [subRepairCode] }],
              });
            }
            symptoms[symptomIndex].subSymptoms = subSymptoms;
          } else {
            symptoms.push({
              symptomCode,
              subSymptoms: [
                { subSymptomCode, repairCodes: [{ repairCode, subRepairCodes: [subRepairCode] }] },
              ],
            });
          }
          defectBlocks[blockIndex].symptoms = symptoms;
        } else {
          // Si no existe el bloque, se agrega a defectBlocks
          defectBlocks.push(newDefectBlock);
        }

        // Actualizamos el documento del modelo
        await updateDoc(modelDocRef, { defectBlocks });
      } else {
        // Si el modelo no existe, lo creamos junto con el primer bloque de defecto
        await setDoc(modelDocRef, {
          productName,
          productModel,
          category,
          imagenes: { modelo: modelImageUrl },
          defectBlocks: [newDefectBlock],
          timestamp: new Date(),
        });
      }

      // Reiniciamos el formulario

      alert('Datos enviados correctamente');
    } catch (error) {
      console.error('Error al enviar datos: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Editar Modelo</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Categoría:</label>
        <input type="text" value={formData.category} disabled />

        <label>Tipo de Producto:</label>
        <input 
          key="2wx23d32cxeq"
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
              <option key={idx} value={block.defectBlock}>{block.defectBlock}</option>
            ))}
          </select>
        ) : (
          <p>No hay bloques disponibles.</p>
        )}

        <label>Imagen del Bloque de Defecto:</label>
        <input type="text" value={formData.defectBlockImageUrl} disabled />

        <label>Código de Síntoma:</label>
        <input type="text" value={formData.symptomCode} disabled />

        <label>Código de Sub-Síntoma:</label>
        <input type="text" value={formData.subSymptomCode} disabled />

        <label>Código de Reparación:</label>
        <input type="text" value={formData.repairCode} disabled />

        <label>Código de Sub-Reparación:</label>
        <input type="text" value={formData.subRepairCode} disabled />
      <button type="submit" >
          Añadir bloque
        </button>
      </form>
    </div>
  );
};

export default EditModel;



