const { Schema, model } = require('mongoose');

const MediaSchema = Schema({

 serial:{
  type:String,
  required:true,
  unique:true
 },

 titulo:{
  type:String,
  required:true
 },

 sinopsis:{
  type:String
 },

 url:{
  type:String,
  required:true,
  unique:true
 },

 imagen:{
  type:String
 },

 anioEstreno:{
  type:Number
 },

 genero:{
  type:Schema.Types.ObjectId,
  ref:'Genero'
 },

 director:{
  type:Schema.Types.ObjectId,
  ref:'Director'
 },

 productora:{
  type:Schema.Types.ObjectId,
  ref:'Productora'
 },

 tipo:{
  type:Schema.Types.ObjectId,
  ref:'Tipo'
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

module.exports = model('Media', MediaSchema);