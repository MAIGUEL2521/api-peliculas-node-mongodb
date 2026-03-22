import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import GeneroSelect from './GeneroSelect';

const MediaForm = ({ onSave, media = null }) => {
  const [formData, setFormData] = useState({
    serial: media?.serial || '',
    titulo: media?.titulo || '',
    sinopsis: media?.sinopsis || '',
    url: media?.url || '',
    imagen: media?.imagen || '',
    anioEstreno: media?.anioEstreno || '',
    genero: media?.genero?._id || '',
    director: media?.director?._id || '',
    productora: media?.productora?._id || '',
    tipo: media?.tipo?._id || ''
  });
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [dirRes, prodRes, tipRes] = await Promise.all([
        api.get('/api/directores'),
        api.get('/api/productoras'),
        api.get('/api/tipos')
      ]);
      setDirectores(dirRes.data);
      setProductoras(prodRes.data);
      setTipos(tipRes.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las opciones', 'error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/medias', formData);
      Swal.fire('Éxito', 'Media guardada', 'success');
      onSave();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Serial</label>
        <input type="text" name="serial" className="form-control" value={formData.serial} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Título</label>
        <input type="text" name="titulo" className="form-control" value={formData.titulo} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Sinopsis</label>
        <textarea name="sinopsis" className="form-control" value={formData.sinopsis} onChange={handleChange}></textarea>
      </div>
      <div className="mb-3">
        <label>URL</label>
        <input type="text" name="url" className="form-control" value={formData.url} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label>Imagen</label>
        <input type="text" name="imagen" className="form-control" value={formData.imagen} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Año Estreno</label>
        <input type="number" name="anioEstreno" className="form-control" value={formData.anioEstreno} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label>Género</label>
        <GeneroSelect 
          value={formData.genero} 
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="mb-3">
        <label>Director</label>
        <select name="director" className="form-control" value={formData.director} onChange={handleChange} required>
          <option value="">Seleccionar</option>
          {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label>Productora</label>
        <select name="productora" className="form-control" value={formData.productora} onChange={handleChange} required>
          <option value="">Seleccionar</option>
          {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
        </select>
      </div>
      <div className="mb-3">
        <label>Tipo</label>
        <select name="tipo" className="form-control" value={formData.tipo} onChange={handleChange} required>
          <option value="">Seleccionar</option>
          {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg">Guardar</button>
    </form>
  );
};

export default MediaForm;