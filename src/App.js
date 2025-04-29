// src/App.js
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import ContactForm from './components/ContactForm';
import AddBlockCodeClosing from './components/AddBlockCodeClosing';
import AddUser from './components/AddUser';
import Login from './components/Login';
import House3 from './components/House3';
import PrivateRoute from './components/PrivateRoute';
import EditModel from './components/EditModel';
import Footer from './components/Footer';
import LegalInfo from './pages/LegalInfo';

function AppRoutes() {
  const location = useLocation();

  // Ocultar footer en estas rutas
  const hideFooterRoutes = ['/login'];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Bridge" element={<House3 />} />
          <Route path="/búzon" element={<ContactForm />} />
          <Route path="/add" element={<PrivateRoute><AddBlockCodeClosing /></PrivateRoute>} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/login" element={<Login onLogin={(user) => console.log('Usuario autenticado:', user)} />} />
          <Route path="/3.0" element={<House3 />} />
          <Route path="/edit/:modelID" element={<EditModel />} />
          <Route path="/legal" element={<LegalInfo />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;










