// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../configs/firebase'; // Asegúrate de la ruta correcta
import { 
  setPersistence, 
  browserLocalPersistence, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut
} from 'firebase/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Establece la persistencia de sesión con Firebase
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false); // Finaliza la carga una vez que se determina el estado
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error('Error estableciendo persistencia:', error);
        setLoading(false);
      });
  }, []);

  // Función para iniciar sesión
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Función para cerrar sesión
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {/* Mientras carga el estado de autenticación, puedes mostrar un spinner o null */}
      {loading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};