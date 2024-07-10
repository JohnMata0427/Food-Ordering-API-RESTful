import Chef from '../models/chef.js'
import mongoose from 'mongoose'

const listarChefs = (req,res)=>{
    res.status(200).json({res:'lista de veterinarios registrados'})
}

const registroChefs =(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Veterinario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoVeterinario = new Veterinario(req.body)
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)
    nuevoVeterinario.crearToken()
    await nuevoVeterinario.save()
    res.status(200).json({nuevoVeterinario})
}

const confirmEmailChefs= (req,res)=>{
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
        const veterinarioBDD = await Veterinario.findOne({token:req.params.token})
        if(!veterinarioBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
        veterinarioBDD.token = null
        veterinarioBDD.confirmEmail=true
        await veterinarioBDD.save()
        res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
    res.status(200).json({res:'confirmar email de registro de chefs'})
}

export{
    listarChefs,
    registroChefs,
    confirmEmailChefs
}