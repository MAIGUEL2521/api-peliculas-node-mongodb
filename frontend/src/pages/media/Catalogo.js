import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMedia } from '../../api/mediaService';
import MovieDetail from '../../components/MovieDetail';

const Catalogo = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [searchParams] = useSearchParams();
  const generoFiltro = searchParams.get('genero');

  useEffect(() => {
    const cargarPeliculas = async () => {
      try {
        const respuesta = await getMedia();
        console.log('Catalogo: datos recibidos', respuesta);
        
        // Filtrar por género si existe parámetro
        let peliculasFiltradas = respuesta || [];
        if (generoFiltro) {
          peliculasFiltradas = peliculasFiltradas.filter(p => {
            const generoNombre = p.genero?.nombre || '';
            return generoNombre.toLowerCase() === generoFiltro.toLowerCase();
          });
        }
        
        setPeliculas(peliculasFiltradas);
      } catch (err) {
        console.error('Catalogo error getMedia:', err);
        setError(`No se pudo cargar el catálogo. ${err.message}`);
      } finally {
        setCargando(false);
      }
    };

    cargarPeliculas();
  }, [generoFiltro]);

  const titulo = generoFiltro 
    ? `Catálogo de Películas - ${generoFiltro}` 
    : 'Catálogo de Películas';

  // Si hay película seleccionada, mostrar detalle
  if (peliculaSeleccionada) {
    return (
      <MovieDetail 
        movie={peliculaSeleccionada} 
        onBack={() => setPeliculaSeleccionada(null)}
      />
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-warning mb-4">{titulo}</h2>

      {cargando && <p className="text-white">Cargando películas...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && peliculas.length === 0 && (
        <div className="alert alert-info">No hay películas disponibles</div>
      )}

      <div className="row">
        {peliculas.map((pelicula) => (
          <div key={pelicula._id || pelicula.id || pelicula.serial} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div 
              className="card h-100 shadow catalog-card"
              onClick={() => setPeliculaSeleccionada(pelicula)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={pelicula.imagen || ''}
                className="card-img-top"
                alt={pelicula.titulo || 'Película'}
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{pelicula.titulo || 'Sin título'}</h5>
                <p className="card-text" style={{ flex: 1 }}>
                  {pelicula.descripcion || pelicula.sinopsis || 'Descripción no disponible'}
                </p>
                <small className="text-warning mt-2">
                  {pelicula.director?.nombres && `Director: ${pelicula.director.nombres}`}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
