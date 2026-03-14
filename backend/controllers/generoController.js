const Genero = require('../models/genero');

const getGeneros = async (req, res) => {
  try {

    const generos = await Genero.find();

    res.json(generos);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: 'Error al obtener géneros'
    });

  }
};

const createGenero = async (req, res) => {

  try {

    const { nombre, descripcion, estado } = req.body;

    const generoDB = await Genero.findOne({ nombre });

    if (generoDB) {
      return res.status(400).json({
        msg: 'El género ya existe'
      });
    }

    const genero = new Genero({
      nombre,
      descripcion,
      estado
    });

    await genero.save();

    res.status(201).json(genero);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: 'Error al crear género'
    });

  }

};

module.exports = {
  getGeneros,
  createGenero
};