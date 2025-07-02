import React, { useState } from 'react';
import { db } from '../configs/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from '../styles/AddBlockCodeClosing.module.css';
import LogoutButton from './LogoutButton';

const AddBlockCodeClosing = () => {
  const [formData, setFormData] = useState({
    category: '',
    productType: '',
    productName: '',
    productModel: '',
    modelImageUrl: '',
    defectBlock: '',
    defectBlockImageUrl: '',
    symptomCode: '',
    subSymptomCode: '',
    repairCode: '',
    subRepairCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      setFormData({
        category: '',
        productType: '',
        productName: '',
        productModel: '',
        modelImageUrl: '',
        defectBlock: '',
        defectBlockImageUrl: '',
        symptomCode: '',
        subSymptomCode: '',
        repairCode: '',
        subRepairCode: '',
      });

      alert('Datos enviados correctamente');
    } catch (error) {
      console.error('Error al enviar datos: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/Bridge" className={styles.buttonHomePage}>
        Volver
      </Link>
      <Link to="/addUser" className={styles.buttonHomePage}>
        Añadir Usuario
      </Link>
      <LogoutButton />
      <h3>Añadir cierre de producto</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Categoría:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={styles.input}
        >
          <option value="">Seleccionar categoría</option>
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
          <option value="NK">NK</option>
        </select>
        {Object.keys(formData).map((key) =>
          key !== 'category' ? (
            <input
              key={key}
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key}
              className={styles.input}
            />
          ) : null
        )}
        <button type="submit" className={styles.submitButton}>
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddBlockCodeClosing;