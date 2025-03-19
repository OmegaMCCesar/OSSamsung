import React, { useState } from 'react';
import { db } from '../configs/firebase';
import { doc, collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from '../styles/AddBlockCodeClosing.module.css';

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
      // Corrección en la estructura de la referencia de Firebase
      const productTypeDocRef = doc(db, 'lineas', category, 'tipos', productType);
      const modelosCollectionRef = collection(productTypeDocRef, 'modelos');
      const modeloDocRef = doc(modelosCollectionRef, productModel);
      const bloquesCollectionRef = collection(modeloDocRef, 'bloques');

      const dataToSave = {
        productName,
        productModel,
        defectBlock,
        symptomCode,
        subSymptomCode,
        repairCode,
        subRepairCode,
        category,
        imagenes: {
          modelo: modelImageUrl,
          bloqueDefecto: defectBlockImageUrl,
        },
        timestamp: new Date(),
      };

      await addDoc(bloquesCollectionRef, dataToSave);

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
      alert(`Hubo un error al enviar los datos: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/Bridge" className={styles.buttonHomePage}>Volver</Link>
      <Link to="/addUser" className={styles.buttonHomePage} >Añadir Usuario</Link>
      <h3>Añadir cierre de producto</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Categoría:</label>
        <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
          <option value="">Seleccionar categoría</option>
          <option value="WSM">WSM</option>
          <option value="REF">REF</option>
        </select>

        <label>Tipo del producto:</label>
        <input type="text" name="productType" value={formData.productType} onChange={handleChange} className={styles.input} />

        <label>Nombre del producto:</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={styles.input} />

        <label>Modelo del producto:</label>
        <input type="text" name="productModel" value={formData.productModel} onChange={handleChange} className={styles.input} />

        <label>URL de la imagen del modelo:</label>
        <input type="text" name="modelImageUrl" value={formData.modelImageUrl} onChange={handleChange} className={styles.input} />

        <label>Bloque de defecto:</label>
        <input type="text" name="defectBlock" value={formData.defectBlock} onChange={handleChange} className={styles.input} />

        <label>URL de la imagen del bloque de defecto:</label>
        <input type="text" name="defectBlockImageUrl" value={formData.defectBlockImageUrl} onChange={handleChange} className={styles.input} />

        <label>Código de síntoma:</label>
        <input type="text" name="symptomCode" value={formData.symptomCode} onChange={handleChange} className={styles.input} />

        <label>Código de sub-síntoma:</label>
        <input type="text" name="subSymptomCode" value={formData.subSymptomCode} onChange={handleChange} className={styles.input} />

        <label>Código de reparación:</label>
        <input type="text" name="repairCode" value={formData.repairCode} onChange={handleChange} className={styles.input} />

        <label>Código de sub-reparación:</label>
        <input type="text" name="subRepairCode" value={formData.subRepairCode} onChange={handleChange} className={styles.input} />

        <button type="submit" className={styles.submitButton}>Añadir</button>
      </form>
    </div>
  );
};

export default AddBlockCodeClosing;










