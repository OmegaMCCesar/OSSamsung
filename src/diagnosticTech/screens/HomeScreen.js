import React from 'react';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <h1>Bienvenido al Diagnóstico de Lavadoras</h1>
      <Link to="/diagnostic">
        <button>Iniciar Diagnóstico</button>
      </Link>
    </div>
  );
};

export default HomeScreen;
