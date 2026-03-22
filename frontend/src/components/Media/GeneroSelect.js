import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const GeneroSelect = ({ value, onChange, required = false, name = 'genero' }) => {
  const [generos, setGeneros] = useState([]);

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
    <select 
      name={name}
      value={value} 
      onChange={onChange} 
      className="form-control" 
      required={required}
    >
      <option value="">Seleccionar Género</option>
      {generos.map(g => (
        <option key={g._id} value={g._id}>{g.nombre}</option>
      ))}
    </select>
  );
};

export default GeneroSelect;
