import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import MovieDetail from '../MovieDetail';

const MediaList = ({ onAdd, refresh }) => {
  const [medias, setMedias] = useState([]);
  const [mediaSeleccionado, setMediaSeleccionado] = useState(null);

  useEffect(() => {
    fetchMedias();
  }, [refresh]);

  const fetchMedias = async () => {
    try {
      const response = await api.get('/api/medias');
      setMedias(response.data);
    } catch (error) {
      Swal.fire('Error', 'No se pudieron cargar las medias', 'error');
    }
  };

  // Si hay media seleccionado, mostrar detalle
  if (mediaSeleccionado) {
    return (
      <MovieDetail 
        movie={mediaSeleccionado} 
        onBack={() => setMediaSeleccionado(null)}
      />
    );
  }

  return (
    <div className="container">
      <h2>Medias</h2>
      <button className="btn btn-primary btn-lg" onClick={onAdd}>Agregar Media</button>
      <table className="table">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Título</th>
            <th>Sinopsis</th>
            <th>Año Estreno</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((media) => (
            <tr key={media._id} onClick={() => setMediaSeleccionado(media)} style={{ cursor: 'pointer' }} className="table-hover">
              <td>{media.serial}</td>
              <td>{media.titulo}</td>
              <td>{media.sinopsis}</td>
              <td>{media.anioEstreno}</td>
              <td>{media.genero?.nombre}</td>
              <td>{media.director?.nombres}</td>
              <td>{media.productora?.nombre}</td>
              <td>{media.tipo?.nombre}</td>
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

export default MediaList;