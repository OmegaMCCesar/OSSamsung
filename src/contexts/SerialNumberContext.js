import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const SerialNumberContext = createContext();

// Proveedor del contexto
export const SerialNumberProvider = ({ children }) => {
  const [serialNumber, setSerialNumber] = useState('');

  return (
    <SerialNumberContext.Provider value={{ serialNumber, setSerialNumber }}>
      {children}
    </SerialNumberContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSerialNumber = () => useContext(SerialNumberContext);
