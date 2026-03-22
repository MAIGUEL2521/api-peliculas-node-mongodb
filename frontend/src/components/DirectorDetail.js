import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DirectorDetail = ({ director, onBack }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPeliculas = async () => {
      try {
        const response = await api.get('/api/medias');
        const peliculasDelDirector = response.data.filter(p => p.director?._id === director._id);
        setPeliculas(peliculasDelDirector);
      } catch (error) {
        console.error('Error al cargar películas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPeliculas();
  }, [director._id]);

  if (!director) return null;

  return (
    <div className="container my-5">
      <button 
        className="btn btn-outline-warning mb-4"
        onClick={onBack}
      >
        ← Volver a Directores
      </button>

      <div className="row">
        <div className="col-md-12">
          <div className="card bg-dark border-warning mb-4">
            <div className="card-body">
              <h2 className="text-warning mb-3">{director.nombres}</h2>
              <p className="text-muted">
                <strong>Estado:</strong> 
                <span className={director.estado === 'Activo' ? 'text-success ms-2' : 'text-danger ms-2'}>
                  {director.estado}
                </span>
              </p>
            </div>
          </div>

          <h3 className="text-warning mb-4">Películas de {director.nombres}</h3>

          {cargando && <p className="text-white">Cargando películas...</p>}

          {!cargando && peliculas.length === 0 && (
            <div className="alert alert-info">No hay películas de este director</div>
          )}

          {!cargando && peliculas.length > 0 && (
            <div className="table-responsive">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>Serial</th>
                    <th>Título</th>
                    <th>Año</th>
                    <th>Género</th>
                    <th>Productora</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {peliculas.map((pelicula) => (
                    <tr key={pelicula._id}>
                      <td>{pelicula.serial}</td>
                      <td>{pelicula.titulo}</td>
                      <td>{pelicula.anioEstreno}</td>
                      <td><span className="text-warning">{pelicula.genero?.nombre}</span></td>
                      <td>{pelicula.productora?.nombre}</td>
                      <td>{pelicula.tipo?.nombre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorDetail;
