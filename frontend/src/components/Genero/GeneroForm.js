import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const GeneroForm = ({ onSave, genero = null }) => {
  const [formData, setFormData] = useState({
    nombre: genero?.nombre || '',
    estado: genero?.estado || 'Activo',
    descripcion: genero?.descripcion || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (genero) {
        // Editar, pero como no hay PUT, solo POST por ahora
        await api.post('/api/generos', formData);
      } else {
        await api.post('/api/generos', formData);
      }
      Swal.fire('Éxito', 'Género guardado', 'success');
      onSave();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nombre</label>
        <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Estado</label>
        <select name="estado" className="form-control" value={formData.estado} onChange={handleChange}>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <div className="mb-3">
        <label>Descripción</label>
        <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
    </form>
  );
};

export default GeneroForm;