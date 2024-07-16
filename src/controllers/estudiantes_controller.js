import mongoose from "mongoose"
import Estudiantes from "../models/estudiante.js"
import { sendMailToUser } from "../config/nodemailer.js"


const registroEstudiantes = async (req,res)=>{
    const {email, password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    const verificarEmailBDD = await Estudiantes.findOne({ email })
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    const nuevoEstudiante = new  Estudiantes(req.body)
    nuevoEstudiante.password = await nuevoEstudiante.encrypPassword(password)
    const token = nuevoEstudiante.crearToken()
    sendMailToUser( email , token )
    await nuevoEstudiante.save()
    res.status(200).json({ nuevoEstudiante })
}


const eliminarEstudiantes = async (req, res) =>{
    await Estudiantes.findByIdAndDelete(req.params.id)
    res.status(200).json({msg: "Estudiante eliminado" })

}


export {
    registroEstudiantes,
    eliminarEstudiantes,
}