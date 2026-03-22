import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const DirectorForm = ({ onSave, director = null }) => {
  const [formData, setFormData] = useState({
    nombres: director?.nombres || '',
    estado: director?.estado || 'Activo'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/directores', formData);
      Swal.fire('Éxito', 'Director guardado', 'success');
      onSave();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nombres</label>
        <input type="text" name="nombres" className="form-control" value={formData.nombres} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Estado</label>
        <select name="estado" className="form-control" value={formData.estado} onChange={handleChange}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
    </form>
  );
};

export default DirectorForm;