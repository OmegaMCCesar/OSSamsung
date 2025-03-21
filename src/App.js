// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bridge from "./components/Bridge";
import Homepage from './components/Homepage';
import ContactForm from './components/ContactForm';
import AddBlockCodeClosing from './components/AddBlockCodeClosing';
import AddUser from './components/AddUser';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import House3 from './components/House3';
/* import PrivateRoute from './components/PrivateRoute'; */

function App() {

  const handleLogin = (user) => {
    // Lógica después del inicio de sesión exitoso
    console.log('Usuario autenticado:', user);

  };

  return (
   <AuthProvider>
   <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Bridge" element={<Bridge />} />
      <Route path='/búzon' element={
        
        <ContactForm />
        } />
      <Route path='/add' element={
      
        <AddBlockCodeClosing />
        } />
      <Route path='/addUser' element={<AddUser />} />
      <Route path='/login' element={<Login onLogin={handleLogin} />} />
      <Route path='/3.0' element={<House3 />} />
    </Routes>
   </Router>
   </AuthProvider>  
  );
}

export default App;









