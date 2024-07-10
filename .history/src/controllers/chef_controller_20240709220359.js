import Chef from '../models/chef.js'
import mongoose from 'mongoose'

const listarChefs = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}

const registroChefs =(req,res)=>{
    res.status(200).json({res:'registro de un nuevo chef'})
}

const confirmEmail = (req,res)=>{
    res.status(200).json({res:'confirmar email de registro de chefs'})
}

export{
    listarChefs,
    registro,
    confirmEmail
}