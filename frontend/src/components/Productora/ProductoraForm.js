import React, { useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const ProductoraForm = ({ onSave, productora = null }) => {
  const [formData, setFormData] = useState({
    nombre: productora?.nombre || '',
    estado: productora?.estado || 'Activo',
    slogan: productora?.slogan || '',
    descripcion: productora?.descripcion || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/productoras', formData);
      Swal.fire('Éxito', 'Productora guardada', 'success');
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
        <label>Slogan</label>
        <input type="text" name="slogan" className="form-control" value={formData.slogan} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Descripción</label>
        <textarea name="descripcion" className="form-control" value={formData.descripcion} onChange={handleChange}></textarea>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
    </form>
  );
};

export default ProductoraForm;