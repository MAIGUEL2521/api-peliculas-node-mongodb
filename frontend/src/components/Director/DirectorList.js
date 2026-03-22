import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import DirectorDetail from '../DirectorDetail';

const DirectorList = ({ onAdd, refresh }) => {
  const [directores, setDirectores] = useState([]);
  const [directorSeleccionado, setDirectorSeleccionado] = useState(null);

  useEffect(() => {
    fetchDirectores();
  }, [refresh]);

  const fetchDirectores = async () => {
    try {
      const response = await api.get('/api/directores');
      setDirectores(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los directores', 'error');
    }
  };

  // Si hay director seleccionado, mostrar detalle
  if (directorSeleccionado) {
    return (
      <DirectorDetail 
        director={directorSeleccionado} 
        onBack={() => setDirectorSeleccionado(null)}
      />
    );
  }

  return (
    <div className="container">
      <h2>Directores</h2>
      <button className="btn btn-primary btn-lg" onClick={onAdd}>Agregar Director</button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director._id} onClick={() => setDirectorSeleccionado(director)} style={{ cursor: 'pointer' }} className="table-hover">
              <td>{director.nombres}</td>
              <td>{director.estado}</td>
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

export default DirectorList;