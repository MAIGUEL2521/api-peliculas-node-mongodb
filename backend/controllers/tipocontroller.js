const Tipo = require('../models/tipo');
const { request, response } = require('express');

const getTipos = async(req=request,res=response)=>{

 try{

  const tipos = await Tipo.find();

  res.status(200).json(tipos);

 }catch(error){

  console.log(error);

  res.status(500).json({
   msg:'Error al listar tipos'
  });

 }

};

const createTipo = async(req=request,res=response)=>{

 try{

  const tipo = new Tipo(req.body);

  await tipo.save();

  res.status(201).json(tipo);

 }catch(error){

  console.log(error);

  res.status(500).json({
   msg:'Error al crear tipo'
  });

 }

};

module.exports={
 getTipos,
 createTipo
}