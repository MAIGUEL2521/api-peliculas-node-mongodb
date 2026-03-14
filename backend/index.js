const express = require('express');
const dotenv = require('dotenv');
const { getConnection } = require('./db/db-connection-mongo');

dotenv.config();

const app = express();

// conectar a la base de datos
getConnection();


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