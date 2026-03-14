const Media = require('../models/media');
const { request, response } = require('express');

const getMedias = async(req=request,res=response)=>{

 try{

  const medias = await Media.find()
   .populate('genero')
   .populate('director')
   .populate('productora')
   .populate('tipo');

  res.status(200).json(medias);

 }catch(error){

  console.log(error);

  res.status(500).json({
   msg:'Error al listar peliculas'
  });

 }

};

const createMedia = async(req=request,res=response)=>{

 try{

  const media = new Media(req.body);

  await media.save();

  res.status(201).json(media);

 }catch(error){

  console.log(error);

  res.status(500).json({
   msg:'Error al crear pelicula'
  });

 }

};

module.exports={
 getMedias,
 createMedia
}