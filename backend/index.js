const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getConnection } = require('./db/db-connection-mongo');

dotenv.config();

const app = express();

const Media = require('./models/media');
const Genero = require('./models/genero');
const Director = require('./models/director');
const Productora = require('./models/productora');
const Tipo = require('./models/tipo');

// conectar a la base de datos
getConnection().then(async () => {
  try {
    // ========== SEED DE GÉNEROS ==========
    await Genero.deleteMany({});
    const generosSeed = [
      { nombre: 'Acción', estado: 'Activo', descripcion: 'Películas de acción' },
      { nombre: 'Drama', estado: 'Activo', descripcion: 'Películas de drama' },
      { nombre: 'Deportes', estado: 'Activo', descripcion: 'Películas de deportes' },
      { nombre: 'Infantil', estado: 'Activo', descripcion: 'Películas infantiles' },
      { nombre: 'Romance', estado: 'Activo', descripcion: 'Películas románticas' },
      { nombre: 'Terror', estado: 'Activo', descripcion: 'Películas de terror' }
    ];
    const generosInsertados = await Genero.insertMany(generosSeed);
    console.log('🟢 6 Géneros cargados.');

    // ========== SEED DE DIRECTORES ==========
    await Director.deleteMany({});
    const directoresSeed = [
      { nombres: 'Christopher Nolan', estado: 'Activo' },
      { nombres: 'Steven Spielberg', estado: 'Activo' },
      { nombres: 'Quentin Tarantino', estado: 'Activo' },
      { nombres: 'Martin Scorsese', estado: 'Activo' },
      { nombres: 'Denis Villeneuve', estado: 'Activo' }
    ];
    const directoresInsertados = await Director.insertMany(directoresSeed);
    console.log('🟢 5 Directores cargados.');

    // ========== SEED DE PRODUCTORAS ==========
    await Productora.deleteMany({});
    const productorasSeed = [
      { nombre: 'Warner Bros.', estado: 'Activo', slogan: 'That\'s all folks!' },
      { nombre: 'Netflix', estado: 'Activo', slogan: 'See what\'s next' },
      { nombre: 'Universal Pictures', estado: 'Activo', slogan: 'Universal' },
      { nombre: 'Disney', estado: 'Activo', slogan: 'The happiest place on Earth' },
      { nombre: 'Paramount', estado: 'Activo', slogan: 'A Mountain Studios Brand' }
    ];
    const productorasInsertadas = await Productora.insertMany(productorasSeed);
    console.log('🟢 5 Productoras cargadas.');

    // ========== SEED DE TIPOS ==========
    await Tipo.deleteMany({});
    const tiposSeed = [
      { nombre: 'Película', descripcion: 'Contenido de largometraje' },
      { nombre: 'Serie', descripcion: 'Contenido episódico' },
      { nombre: 'Documental', descripcion: 'Contenido informativo' }
    ];
    const tiposInsertados = await Tipo.insertMany(tiposSeed);
    console.log('🟢 3 Tipos cargados.');

    // ========== SEED DE PELÍCULAS (CON TODAS LAS ASOCIACIONES) ==========
    const generoAccion = generosInsertados.find(g => g.nombre === 'Acción');
    const generoDrama = generosInsertados.find(g => g.nombre === 'Drama');
    const generoTerror = generosInsertados.find(g => g.nombre === 'Terror');

    const directorNolan = directoresInsertados.find(d => d.nombres === 'Christopher Nolan');
    const directorSpielberg = directoresInsertados.find(d => d.nombres === 'Steven Spielberg');
    const directorVilleneuve = directoresInsertados.find(d => d.nombres === 'Denis Villeneuve');

    const productoraWarner = productorasInsertadas.find(p => p.nombre === 'Warner Bros.');
    const productoraUniversal = productorasInsertadas.find(p => p.nombre === 'Universal Pictures');
    const productoraNetflix = productorasInsertadas.find(p => p.nombre === 'Netflix');

    const tipoPelicula = tiposInsertados.find(t => t.nombre === 'Película');
    const tipoSerie = tiposInsertados.find(t => t.nombre === 'Serie');

    await Media.deleteMany({});
    const peliculasSeed = [
      {
        serial: 'MOV-001',
        titulo: 'El Secreto del Código',
        sinopsis: 'Un ingeniero descubre un mensaje oculto que cambia el mundo.',
        url: 'https://www.youtube.com/watch?v=example',
        imagen: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=500&q=60',
        anioEstreno: 2022,
        genero: generoAccion._id,
        director: directorNolan._id,
        productora: productoraWarner._id,
        tipo: tipoPelicula._id
      },
      {
        serial: 'MOV-002',
        titulo: 'La Noche del Planeta',
        sinopsis: 'Una expedición al planeta distante encuentra una civilización perdida.',
        url: 'https://www.youtube.com/watch?v=example2',
        imagen: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?auto=format&fit=crop&w=500&q=60',
        anioEstreno: 2021,
        genero: generoAccion._id,
        director: directorVilleneuve._id,
        productora: productoraUniversal._id,
        tipo: tipoPelicula._id
      },
      {
        serial: 'MOV-003',
        titulo: 'Héroes del Tiempo',
        sinopsis: 'Viajeros en el tiempo luchan por evitar un futuro apocalíptico.',
        url: 'https://www.youtube.com/watch?v=example3',
        imagen: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=500&q=60',
        anioEstreno: 2024,
        genero: generoAccion._id,
        director: directorSpielberg._id,
        productora: productoraWarner._id,
        tipo: tipoPelicula._id
      },
      {
        serial: 'MOV-004',
        titulo: 'Sombras del Ayer',
        sinopsis: 'Un detective investiga crímenes que desafían toda lógica.',
        url: 'https://www.youtube.com/watch?v=example4',
        imagen: 'https://images.unsplash.com/photo-1489599735734-79b4ba6c7c0b?auto=format&fit=crop&w=500&q=60',
        anioEstreno: 2023,
        genero: generoDrama._id,
        director: directorNolan._id,
        productora: productoraNetflix._id,
        tipo: tipoSerie._id
      }
    ];
    await Media.insertMany(peliculasSeed);
    console.log('🟢 4 Películas cargadas con todas las asociaciones.');
    console.log('✅ Base de datos inicializada correctamente.');

  } catch (seedError) {
    console.error('⚠️ Error al inicializar:', seedError.message);
  }
}).catch((err) => {
  console.error('❌ Error en getConnection:', err);
});

app.use(cors());
app.use(express.json());

// rutas
app.use('/api/directores', require('./routes/director'));
app.use('/api/generos', require('./routes/genero'));
app.use('/api/productoras', require('./routes/productora'));
app.use('/api/tipos', require('./routes/tipo'));
app.use('/api/medias', require('./routes/media'));

// puerto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});