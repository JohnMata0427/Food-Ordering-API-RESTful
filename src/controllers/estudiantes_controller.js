import Estudiante from "../models/estudiante.js";
import { sendMailToUser, sendMailToRecoveryPassword } from "../config/nodemailer.js";
import { Types } from "mongoose";
import generarJWT from "../helpers/crearJWT.js";
import fs from "fs-extra";
import cloudinary from "cloudinary";

const listarEstudiantes = async (_, res) => {
    const estudiantes = await Estudiante.find();

    if (!estudiantes) return res.status(404).json({ msg: "Lo sentimos, no se encontraron estudiantes" });

    res.status(200).json(estudiantes);
}

const detalleEstudiante = async (req, res) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Lo sentimos, el id proporcionado no es válido" });

    const estudiante = await Estudiante.findById(id);

    if (!estudiante) return res.status(404).json({ msg: `Lo sentimos, no existe el estudiante ${id}` });

    res.status(200).json(estudiante);
}

const registroEstudiantes = async (req, res) => {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });

    const verificarEmailBDD = await Estudiante.findOne({ email });

    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });

    const nuevoEstudiante = new Estudiante(req.body);

    nuevoEstudiante.password = await nuevoEstudiante.encryptPassword(password);

    const token = nuevoEstudiante.crearToken();

    sendMailToUser(email, token);

    await nuevoEstudiante.save();

    res.status(200).json(nuevoEstudiante);
};

const confirmEmailEstudiantes = async (req, res) => {
    if (!req.params.token) return res.status(400).json({ msg: "Lo sentimos, debe proporcionar un token" });

    const EstudianteBDD = await Estudiante.findOne({ token: req.params.token });

    if (!EstudianteBDD) return res.status(404).json({ msg: "Lo sentimos, el token es inválido" });

    if (EstudianteBDD.confirmEmail) return res.status(404).json({ msg: "La cuenta ya ha sido confirmada" });

    EstudianteBDD.token = null;
    EstudianteBDD.confirmEmail = true;

    await EstudianteBDD.save();

    res.status(200).json({ msg: "Token confirmado, ya puedes iniciar sesión" });
};

const loginEstudiantes = async (req, res) => {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });

    const EstudianteBDD = await Estudiante.findOne({ email });

    if (!EstudianteBDD) return res.status(404).json({ msg: "Lo sentimos, el email no se encuentra registrado" });

    if (!await EstudianteBDD.matchPassword(password)) return res.status(400).json({ msg: "Lo sentimos, la contraseña es incorrecta" });

    if (!EstudianteBDD.confirmEmail) return res.status(400).json({ msg: "Lo sentimos, debes confirmar tu email" });

    const { nombre, apellido, facultad, telefono, direccion, _id } = EstudianteBDD;

    const token = generarJWT(_id, "estudiante");

    res.status(200).json({
        token,
        _id,
        nombre,
        apellido,
        facultad,
        telefono,
        email,
        direccion
    });
}

const actualizarContrasenaEstudiante = async (req, res) => {
    const EstudianteBDD = await Estudiante.findById(req.estudianteBDD._id);

    if (!EstudianteBDD) return res.status(404).json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
    
    const verificarPassword = await EstudianteBDD.matchPassword(req.body.passwordactual);

    if (!verificarPassword) return res.status(404).json({ msg: "Lo sentimos, el password actual es incorrecto" });

    EstudianteBDD.password = await EstudianteBDD.encryptPassword(req.body.passwordnuevo);

    await EstudianteBDD.save();
    
    res.status(200).json({ msg: "Password actualizado correctamente" });
};

const recuperarPassword = async (req, res) => {
    const { email } = req.body;
    
    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Debes llenar todos los campos" });
    
    const EstudianteBDD = await Estudiante.findOne({ email });
    
    if (!EstudianteBDD) return res.status(404).json({ msg: "ERROR!! El usuario ingresado no existe" });
    
    const token = EstudianteBDD.crearToken();
    
    EstudianteBDD.token = token;
    
    await sendMailToRecoveryPassword(email, token, 'estudiantes');
    
    await EstudianteBDD.save();
    
    res.status(200).json({ msg: "Se ha enviado un TOKEN a tu bandeja de entrada de tu correo" });
};

const comprobarTokenPassword = async (req, res) => {
    if (!req.params.token) return res.status(404).json({ msg: "Lo sentimos, debe proporcionar un token" });

    const EstudianteBDD = await Estudiante.findOne({ token: req.params.token });

    if (EstudianteBDD.token !== req.params.token) return res.status(404).json({ msg: "Lo sentimos, el token es inválido" });
    
    await EstudianteBDD.save();
    
    res.status(200).json({ msg: "Se ha validado la cuenta, ya puedes ya puedes crear tu nueva contraseña" });
};

const nuevoPassword = async (req, res) => {
    const { password, confirmPassword } = req.body;

    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Debes llenar todos los campos" });

    if (password !== confirmPassword) return res.status(404).json({ msg: "Las contraseñas no coinciden" });

    const EstudianteBDD = await Estudiante.findOne({ token: req.params.token });
    
    if (EstudianteBDD?.token !== req.params.token) return res.status(404).json({ msg: "No se pudo validar la cuenta" });

    EstudianteBDD.token = null;
    EstudianteBDD.password = await EstudianteBDD.encryptPassword(password);
    
    await EstudianteBDD.save();
    
    res.status(200).json({ msg: "Se ha actualizado la contraseña" });
};

const eliminarEstudiantes = async (req, res) => {

    if (!req.params.id) return res.status(400).json({ msg: "Lo sentimos, debe proporcionar un id" });

    if (!Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: "Lo sentimos, el id proporcionado no es válido" });

    await Estudiante.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Estudiante eliminado" });
};

const perfilEstudiante = async (req, res) => {
    res.status(200).json(req.estudianteBDD);
};

const actualizarPerfilEstudiante = async (req, res) => {
    const { id } = req.params;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    
    if (req.files) {
        const cloudinaryResponse = await cloudinary.uploader.upload(
            req.files.imagen.tempFilePath,
            { folder: "estudiantes" }
        );
        req.body.foto = {
            url: cloudinaryResponse.secure_url,
            public_id: cloudinaryResponse.public_id,
        };
        await fs.unlink(req.files.imagen.tempFilePath);
    }
    
    await Estudiante.findByIdAndUpdate(id, req.body);

    res.status(200).json({ msg: "Perfil del estudiante actualizado correctamente" });
}

export { 
    registroEstudiantes, 
    eliminarEstudiantes, 
    perfilEstudiante, 
    actualizarPerfilEstudiante,
    confirmEmailEstudiantes,
    loginEstudiantes,
    actualizarContrasenaEstudiante,
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPassword,
    listarEstudiantes,
    detalleEstudiante
};