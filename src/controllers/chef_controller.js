import chef from '../models/chef.js'
import mongoose from 'mongoose'

const listarChefs = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}

const registroChefs = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await chef.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoChef = new chef(req.body)
    nuevoChef.password = await nuevoChef.encrypPassword(password)
    nuevoChef.crearToken()
    await nuevoChef.save()
    res.status(200).json({nuevoChef})
}

const confirmEmailChefs= async (req,res)=>{
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const ChefBDD = await chef.findOne({token:req.params.token})
    if(!ChefBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    ChefBDD.token = null
    ChefBDD.confirmEmail=true
    await ChefBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
    res.status(200).json({res:'confirmar email de registro de chefs'})
}

const loginChefs = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, tiene que llenar todos los campos"})
    
    const ChefBDD = await chef.findOne({email})
    if(ChefBDD.confirmEmail === false) return res.status(403).json
    ({msg:"Lo sentimos, debes verificar tu cuenta para poder iniciar sesión"})
    if(!ChefBDD) return res.status(403).json({msg:"Lo sentimos, el email no existe"})
    
    const verificarPassword = await ChefBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password es incorrecto"})
    
    //const token = generarJWT(ChefBDD._id,"Chef")
    const {nombre,apellido,telefono,especialidad,trayectoria,_id} = ChefBDD

    res.status(200).json({nombre,apellido,telefono,especialidad,trayectoria,_id,email:ChefBDD.email})
}
export{
    listarChefs,
    registroChefs,
    confirmEmailChefs,
    loginChefs
}