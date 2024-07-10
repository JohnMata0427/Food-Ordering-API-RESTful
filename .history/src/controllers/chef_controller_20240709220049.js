import Chef from '../models/chef.js'
import mongoose from 'mongoose'

const listarChefs = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}

const registro =(req,res)=>{
    res.status(200).json({res:'registro de un nuevo chef'})
}


export{
    listarChefs
}