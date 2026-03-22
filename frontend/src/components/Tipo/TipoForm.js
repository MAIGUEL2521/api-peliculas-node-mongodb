import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const TipoForm = ({ onSave, tipo = null }) => {
  const [formData, setFormData] = useState({
    nombre: tipo?.nombre || '',
    descripcion: tipo?.descripcion || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/tipos', formData);
      Swal.fire('Éxito', 'Tipo guardado', 'success');
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
        <label>Descripción</label>
        <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
    </form>
  );
};

export default TipoForm;