// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bridge from "./components/Bridge";
import Homepage from './components/Homepage';
import ContactForm from './components/ContactForm';
import AddBlockCodeClosing from './components/AddBlockCodeClosing';
import AddUser from './components/AddUser';
import Login from './components/Login';
import House3 from './components/House3';
import PrivateRoute from './components/PrivateRoute';
import EditModel from './components/EditModel';

/* import PrivateRoute from './components/PrivateRoute'; */

function App() {



  const handleLogin = (user) => {
    // Lógica después del inicio de sesión exitoso
    console.log('Usuario autenticado:', user);
  };

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Bridge" element={<Bridge />} />
      <Route path='/búzon' element={       
        <ContactForm />
        } />
      <Route path='/add' element={
       <PrivateRoute>
        <AddBlockCodeClosing/>
        </PrivateRoute>
        } />
      <Route path='/addUser' element={<AddUser />} />
      <Route path='/login' element={<Login onLogin={handleLogin} />} />
      <Route path='/3.0' element={<House3 />} />
      <Route path="/edit/:modelID" element={<EditModel />}/>
    </Routes> 
   </Router>
  );
}

export default App;









