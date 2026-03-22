import React from 'react';

const MovieDetail = ({ movie, onBack }) => {
  if (!movie) return null;

  return (
    <div className="container my-5">
      {/* Botón volver */}
      <button 
        className="btn btn-outline-warning mb-4"
        onClick={onBack}
      >
        ← Volver al Catálogo
      </button>

      <div className="row">
        {/* Imagen */}
        <div className="col-md-4 mb-4">
          <img 
            src={movie.imagen} 
            alt={movie.titulo}
            className="img-fluid rounded shadow-lg"
            style={{ objectFit: 'cover', height: '400px', width: '100%' }}
          />
        </div>

        {/* Información */}
        <div className="col-md-8">
          {/* Título */}
          <h1 className="text-warning mb-3 fw-bold">{movie.titulo}</h1>

          {/* Serial */}
          <p className="text-muted mb-3">
            <strong>Serial:</strong> {movie.serial}
          </p>

          {/* Información de la película */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="card bg-dark border-warning">
                <div className="card-body">
                  <h6 className="card-title text-warning">
                    📅 Año de Estreno
                  </h6>
                  <p className="card-text text-light">{movie.anioEstreno}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-dark border-warning">
                <div className="card-body">
                  <h6 className="card-title text-warning">
                    🎬 Tipo
                  </h6>
                  <p className="card-text text-light">{movie.tipo?.nombre || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-dark border-warning">
                <div className="card-body">
                  <h6 className="card-title text-warning">
                    👤 Director
                  </h6>
                  <p className="card-text text-light">{movie.director?.nombres || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-dark border-warning">
                <div className="card-body">
                  <h6 className="card-title text-warning">
                    🎥 Productora
                  </h6>
                  <p className="card-text text-light">{movie.productora?.nombre || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <div className="card bg-dark border-warning">
                <div className="card-body">
                  <h6 className="card-title text-warning">
                    🎭 Género
                  </h6>
                  <p className="card-text text-light">{movie.genero?.nombre || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sinopsis */}
          <div className="card bg-dark border-warning">
            <div className="card-body">
              <h5 className="card-title text-warning mb-3">📝 Sinopsis</h5>
              <p className="card-text text-light">{movie.sinopsis}</p>
            </div>
          </div>

          {/* Video link */}
          {movie.url && (
            <div className="mt-4">
              <a 
                href={movie.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-warning btn-lg"
              >
                🎥 Ver Tráiler
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
