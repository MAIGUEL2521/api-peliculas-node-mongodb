import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TipoDetail = ({ tipo, onBack }) => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPeliculas = async () => {
      try {
        const response = await api.get('/api/medias');
        const peliculasDeTipo = response.data.filter(p => p.tipo?._id === tipo._id);
        setPeliculas(peliculasDeTipo);
      } catch (error) {
        console.error('Error al cargar películas:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPeliculas();
  }, [tipo._id]);

  if (!tipo) return null;

  return (
    <div className="container my-5">
      <button 
        className="btn btn-outline-warning mb-4"
        onClick={onBack}
      >
        ← Volver a Tipos
      </button>

      <div className="row">
        <div className="col-md-12">
          <div className="card bg-dark border-warning mb-4">
            <div className="card-body">
              <h2 className="text-warning mb-3">{tipo.nombre}</h2>
              {tipo.descripcion && (
                <p className="text-muted">
                  <strong>Descripción:</strong> {tipo.descripcion}
                </p>
              )}
            </div>
          </div>

          <h3 className="text-warning mb-4">Películas/Series de Tipo {tipo.nombre}</h3>

          {cargando && <p className="text-white">Cargando contenido...</p>}

          {!cargando && peliculas.length === 0 && (
            <div className="alert alert-info">No hay películas/series de este tipo</div>
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
                    <th>Director</th>
                    <th>Productora</th>
                  </tr>
                </thead>
                <tbody>
                  {peliculas.map((pelicula) => (
                    <tr key={pelicula._id}>
                      <td>{pelicula.serial}</td>
                      <td>{pelicula.titulo}</td>
                      <td>{pelicula.anioEstreno}</td>
                      <td><span className="text-warning">{pelicula.genero?.nombre}</span></td>
                      <td>{pelicula.director?.nombres}</td>
                      <td>{pelicula.productora?.nombre}</td>
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

export default TipoDetail;
