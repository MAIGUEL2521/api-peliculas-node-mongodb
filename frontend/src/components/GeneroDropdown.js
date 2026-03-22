import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const GeneroDropdown = () => {
  const [generos, setGeneros] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const response = await api.get('/api/generos');
        setGeneros(response.data || []);
      } catch (error) {
        console.error('Error cargando géneros:', error);
      }
    };
    cargarGeneros();
  }, []);

  return (
    <div className="nav-item dropdown" style={{ position: 'relative' }}>
      <button
        className="nav-link btn btn-link"
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ cursor: 'pointer', textDecoration: 'none' }}
      >
        Género ▼
      </button>
      {showDropdown && (
        <div
          className="dropdown-menu show"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            minWidth: '150px'
          }}
        >
          {generos.map(g => (
            <Link
              key={g._id}
              to={`/catalogo?genero=${g.nombre}`}
              className="dropdown-item"
              onClick={() => setShowDropdown(false)}
            >
              {g.nombre}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneroDropdown;
