const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({

  nombres: {
    type: String,
    required: [true, 'Los nombres son obligatorios']
  },

  estado: {
    type: String,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  },

  fechaCreacion: {
    type: Date,
    required: true,
    default: Date.now
  },

  fechaActualizacion: {
    type: Date,
    required: true,
    default: Date.now
  }

});

module.exports = model('Director', DirectorSchema);