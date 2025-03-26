import React, { useState } from 'react';
import styles from '../styles/AddUser.module.css';
import { db } from '../configs/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const AddUser = () => {
  const [dataForm, setFormData] = useState({
    userName: '',
    email: '',
    role: '',
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
    try {
      const docRef = await addDoc(collection(db, 'users'), dataForm);
      console.log('Usuario añadido con ID: ', docRef.id);
      setFormData({
        userName: '',
        email: '',
        role: '',
      });
    } catch (e) {
      console.error('Error añadiendo el usuario: ', e);
    }
  };

  return (
    <div className={styles.container}>
      <Link className={styles.atras} to="/add">atras</Link>
      <h3>Añadir usuario</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Nombre de usuario</label>
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          value={dataForm.userName}
        />
        <label htmlFor="email">Email de usuario</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email de usuario"
          onChange={handleChange}
          value={dataForm.email}
        />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          placeholder="Role"
          onChange={handleChange}
          value={dataForm.role}
        />
        <button type="submit">Añadir Usuario</button>
      </form>
    </div>
  );
};

export default AddUser;

