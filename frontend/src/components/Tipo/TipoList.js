import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import TipoDetail from '../TipoDetail';

const TipoList = ({ onAdd, refresh }) => {
  const [tipos, setTipos] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  useEffect(() => {
    fetchTipos();
  }, [refresh]);

  const fetchTipos = async () => {
    try {
      const response = await api.get('/api/tipos');
      setTipos(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los tipos', 'error');
    }
  };

  // Si hay tipo seleccionado, mostrar detalle
  if (tipoSeleccionado) {
    return (
      <TipoDetail 
        tipo={tipoSeleccionado} 
        onBack={() => setTipoSeleccionado(null)}
      />
    );
  }

  return (
    <div className="container">
      <h2>Tipos</h2>
      <button className="btn btn-primary btn-lg" onClick={onAdd}>Agregar Tipo</button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo._id} onClick={() => setTipoSeleccionado(tipo)} style={{ cursor: 'pointer' }} className="table-hover">
              <td>{tipo.nombre}</td>
              <td>{tipo.descripcion}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-warning btn-sm me-2">Editar</button>
                <button className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TipoList;