// src/components/UserManagement.js
import React, { useState } from 'react';
import styles from '../styles/UserManagement.module.css';

function UserManagement({ onAddUser }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = () => {
    if (newUsername && newPassword) {
      onAddUser(newUsername, newPassword);
      setNewUsername('');
      setNewPassword('');
    } else {
      alert('Por favor, ingresa un usuario y una contraseña');
    }
  };

  return (
    <div className={styles.userManagementContainer}>
      <h3>Gestión de Usuarios</h3>
      <input
        type="text"
        placeholder="Nuevo Usuario"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleAddUser} className={styles.button}>Agregar Usuario</button>
    </div>
  );
}

export default UserManagement;
