import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Genero from '../components/Genero/Genero';
import GeneroDropdown from '../components/GeneroDropdown';
import Director from '../components/Director/Director';
import Productora from '../components/Productora/Productora';
import Tipo from '../components/Tipo/Tipo';
import Media from '../components/Media/Media';
import Catalogo from '../pages/media/Catalogo';

const AppRouter = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
          <div className="container">
            <Link className="navbar-brand text-warning" to="/">Aplicación Películas</Link>
            <div className="navbar-nav">
              <GeneroDropdown />
              <Link className="nav-link" to="/director">Director</Link>
              <Link className="nav-link" to="/productora">Productora</Link>
              <Link className="nav-link" to="/tipo">Tipo</Link>
              <Link className="nav-link" to="/media">Media</Link>
              <Link className="nav-link" to="/catalogo">Catálogo</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/genero" element={<Genero />} />
          <Route path="/director" element={<Director />} />
          <Route path="/productora" element={<Productora />} />
          <Route path="/tipo" element={<Tipo />} />
          <Route path="/media" element={<Media />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/" element={<h1 className="text-center mt-5 fade-in">Bienvenido a la App de Películas</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
