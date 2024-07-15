import { sendMailToRecoveryPassword, sendMailToUser } from '../config/nodemailer.js'
import generarJWT from '../helpers/crearJWT.js'
import chef from '../models/chef.js'
import mongoose from 'mongoose'

const listarChefs = (req, res) => {
    res.status(200).json({ res: 'lista de veterinarios registrados' })
}

const registroChefs = async (req, res) => {
    const { email, password } = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    const verificarEmailBDD = await chef.findOne({ email })
    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" })
    const nuevoChef = new chef(req.body)
    nuevoChef.password = await nuevoChef.encrypPassword(password)
    const token = nuevoChef.crearToken()
    sendMailToUser( email , token )
    await nuevoChef.save()
    res.status(200).json({ nuevoChef })
}

const confirmEmailChefs = async (req, res) => {
    if (!(req.params.token)) return res.status(400).json({ msg: "Lo sentimos, no se puede validar la cuenta" })
    const ChefBDD = await chef.findOne({ token: req.params.token })
    if (!ChefBDD?.token) return res.status(404).json({ msg: "La cuenta ya ha sido confirmada" })
    ChefBDD.token = null
    ChefBDD.confirmEmail = true
    await ChefBDD.save()
    res.status(200).json({ msg: "Token confirmado, ya puedes iniciar sesión" })
    res.status(200).json({ res: 'confirmar email de registro de chefs' })
}

const loginChefs = async (req, res) => {
    const { email, password } = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Lo sentimos, tiene que llenar todos los campos" })

    const ChefBDD = await chef.findOne({ email })
    if (ChefBDD.confirmEmail === false) return res.status(403).json
        ({ msg: "Lo sentimos, debes verificar tu cuenta para poder iniciar sesión" })
    if (!ChefBDD) return res.status(403).json({ msg: "Lo sentimos, el email no existe" })

    const verificarPassword = await ChefBDD.matchPassword(password)
    if (!verificarPassword) return res.status(404).json({ msg: "Lo sentimos, la contraseña es incorrecta" })

    const token = generarJWT(ChefBDD._id, "chef")
    const { nombre, apellido, telefono, especialidad, trayectoria, _id } = ChefBDD

    res.status(200).json({ token, nombre, apellido, telefono, especialidad, trayectoria, _id, email: ChefBDD.email })
}

const actualizarPerfilChef = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, debe ser un id válido` })
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" })
    const chefBDD = await chef.findById(id)
    if (!chefBDD) return res.status(404).json({ msg: `Lo sentimos, no existe el veterinario ${id}` })

    chefBDD.nombre = req.body.nombre || chefBDD?.nombre
    chefBDD.apellido = req.body.apellido || chefBDD?.apellido
    chefBDD.telefono = req.body.telefono || chefBDD?.telefono
    chefBDD.email = req.body.email || chefBDD?.email
    chefBDD.especialidad = req.body.especialidad || chefBDD?.especialidad
    chefBDD.trayectoria = req.body.trayectoria || chefBDD?.trayectoria
    chefBDD.foto = req.body.foto || chefBDD?.foto

    await chefBDD.save()
    res.status(200).json({ msg: "Perfil del chef actualizado correctamente" })
}

const actualizarContrasenaChef = async (req, res) => {
    const chefBDD = await chefBDD.findById(req.chefBDD._id)
    if (!chefBDD) return res.status(404).json({ msg: `Lo sentimos, no existe el veterinario ${id}` })
    const verificarPassword = await chefBDD.matchPassword(req.body.passwordactual)
    if (!verificarPassword) return res.status(404).json({ msg: "Lo sentimos, el password actual no es el correcto" })
    chefBDD.password = await chefBDD.encrypPassword(req.body.passwordnuevo)
    await chefBDD.save()
    res.status(200).json({ msg: "Password actualizado correctamente" })
}

const recuperarPassword = async ( req , res ) => {
    const { email } = req.body;
    if ( Object.values( req.body ).includes("")) return res.status(404).json({msg:"Debes llenar todos los campos"});
    const chefBDD = await chef.findOne({email});
    if (!chefBDD) return res.status(404).json({msg:"ERROR!! , el usuario ingresado no existe"});
    const token = chefBDD.crearToken();
    chefBDD.token=token;
    await sendMailToRecoveryPassword( email , token );
    await chefBDD.save();
    res.status(200).json({msg:"Se ha enviado un TOKEN a tu bandeja de entrada de tu correo"});
}

const comprobarTokenPassword = async ( req , res ) => {
    if ( !(req.params.token) ) return res.status(404).json({msg:"Lo sentimos, no se puede validar la cuenta"});
    const chefBDD = await chef.findOne({token:req.params.token});
    if (chefBDD.token !== req.params.token) return res.status(404).json({msg:"No se pudo validar la cuenta"});
    await chefBDD.save();
    res.status(200).json({msg:"Se ha validado la cuenta, ya puedes ya puedes crear tu nueva contraseña"});
}

const nuevoPassword = async ( req , res ) => {
    const { password , confirmPassword } = req.body;
    if ( Object.values( req.body ).includes("")) return res.status(404).json({msg});
    if ( password !== confirmPassword ) return res.status(404).json({msg:"Las contraseña no coincide"});
    const chefBDD = await chef.findOne({token:req.params.token});
    if(chefBDD?.token !== req.params.token) return res.status(404).json({msg:"No se pudo validar la cuenta"});
    chefBDD.token=null;
    chefBDD.password = await chefBDD.encrypPassword(password);
    await chefBDD.save();
    res.status(200).json({msg:"Se ha actualizado la contraseña"});
}

export {
    listarChefs,
    registroChefs,
    confirmEmailChefs,
    loginChefs,
    actualizarPerfilChef,
    actualizarContrasenaChef, 
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPassword
}