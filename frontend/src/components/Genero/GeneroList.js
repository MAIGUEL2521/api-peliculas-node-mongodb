import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const GeneroList = ({ onAdd, refresh }) => {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    fetchGeneros();
  }, [refresh]);

  const fetchGeneros = async () => {
    try {
      const response = await api.get('/api/generos');
      setGeneros(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
    }
  };

  return (
    <div className="container">
      <h2>Géneros</h2>
      <button className="btn btn-primary btn-lg" onClick={onAdd}>Agregar Género</button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero._id}>
              <td>{genero.nombre}</td>
              <td>{genero.estado}</td>
              <td>{genero.descripcion}</td>
              <td>
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

export default GeneroList;