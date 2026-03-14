const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({

 nombre:{
  type:String,
  required:[true,'El nombre es obligatorio']
 },

 estado:{
  type:String,
  enum:['Activo','Inactivo'],
  default:'Activo'
 },

 slogan:{
  type:String
 },

 descripcion:{
  type:String
 },

 fechaCreacion:{
  type:Date,
  default:Date.now
 },

 fechaActualizacion:{
  type:Date,
  default:Date.now
 }

});

module.exports = model('Productora', ProductoraSchema);