import Chef from '../models/chef.js'
import mongoose from 'mongoose'

const listarChefs = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}




export{
    listarChefs
}