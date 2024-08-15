import {
    sendMailToRecoveryPassword,
    sendMailToUser,
} from "../config/nodemailer.js";
import generarJWT from "../helpers/crearJWT.js";
import chef from "../models/chef.js";
import mongoose from "mongoose";
import fs from "fs-extra";
import cloudinary from "cloudinary";

const listarChefs = async (_, res) => {
    const chefs = await chef.find().select("-password -token -confirmEmail -__v -createdAt -updatedAt").where({ confirmEmail: true, estado: true });

    if (chefs.length === 0) return res.status(404).json({ msg: "Lo sentimos, no hay chefs registrados" });

    res.status(200).json(chefs);
};

const registroChefs = async (req, res) => {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    
    const verificarEmailBDD = await chef.findOne({ email });

    if (verificarEmailBDD) return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });

    const nuevoChef = new chef(req.body);

    nuevoChef.password = await nuevoChef.encryptPassword(password);

    const token = nuevoChef.crearToken();

    sendMailToUser(email, token);

    await nuevoChef.save();

    res.status(201).json(nuevoChef);
};

const confirmEmailChefs = async (req, res) => {
    
    if (!req.params.token) return res.status(400).json({ msg: "Lo sentimos, debe proporcionar un token" });
    
    const ChefBDD = await chef.findOne({ token: req.params.token });

    if (!ChefBDD) return res.status(404).json({ msg: "Lo sentimos, el token es inválido" });

    ChefBDD.token = null;
    ChefBDD.confirmEmail = true;

    await ChefBDD.save();

    res.status(200).json({ msg: "Email confirmado, ya puedes iniciar sesión" });
};

const loginChefs = async (req, res) => {
    const { email, password } = req.body;

    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, tiene que llenar todos los campos" });

    const ChefBDD = await chef.findOne({ email });

    if (!ChefBDD) return res.status(404).json({ msg: "Lo sentimos, el email no existe" });

    if (!ChefBDD.confirmEmail) return res.status(401).json({msg: "Lo sentimos, debes verificar tu cuenta para poder iniciar sesión"});

    const verificarPassword = await ChefBDD.matchPassword(password);

    if (!verificarPassword) return res.status(401).json({ msg: "Lo sentimos, la contraseña es incorrecta" });

    const token = generarJWT(ChefBDD._id, "chef");

    const { nombre, apellido, telefono, especialidad, trayectoria, _id } = ChefBDD;

    res.status(200).json({
        token,
        _id,
        nombre,
        apellido,
        telefono,
        especialidad,
        trayectoria,
        email
    });
};

const perfilChef = (req, res) => {
    if (!req.chefBDD) return res.status(401).json({ msg: "Lo sentimos, no se ha encontrado el chef, por favor inicie sesión" });

    res.status(200).json(req.chefBDD);
};

const actualizarPerfilChef = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `Lo sentimos, debe ser un id válido` });
    
    try {
        if (req.files && req.files.image) {
            const cloudinaryResponse = await cloudinary.uploader.upload(
                req.files.image.tempFilePath,
                { folder: "chefs" }
            );
            req.body.foto = {
                url: cloudinaryResponse.secure_url,
                public_id: cloudinaryResponse.public_id,
            };
            await fs.unlink(req.files.image.tempFilePath);
        }

        await chef.findByIdAndUpdate(id, req.body);

        res.status(200).json({ msg: "Perfil del chef actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

const actualizarContrasenaChef = async (req, res) => {
    const chefBDD = await chef.findById(req.chefBDD._id);

    if (!chefBDD) return res.status(404).json({ msg: `Lo sentimos, no existe el chef ${id}` });
    
    const verificarPassword = await chefBDD.matchPassword(req.body.passwordactual);

    if (!verificarPassword) return res.status(404).json({ msg: "Lo sentimos, el password actual es incorrecto" });

    chefBDD.password = await chefBDD.encryptPassword(req.body.passwordnuevo);

    await chefBDD.save();
    
    res.status(200).json({ msg: "Password actualizado correctamente" });
};

const recuperarPassword = async (req, res) => {
    const { email } = req.body;

    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Debes llenar todos los campos" });
    
    const chefBDD = await chef.findOne({ email });
    
    if (!chefBDD) return res.status(404).json({ msg: "Lo sentimos, el email no existe" });
    
    const token = chefBDD.crearToken();
    const verificationCode = Math.floor(Math.random() * (899999) + 100000);
    
    chefBDD.token = token;
    chefBDD.verificationCode = verificationCode;
    
    await chefBDD.save();

    await sendMailToRecoveryPassword(email, token, verificationCode, '');
    
    res.status(200).json({ msg: "Se ha enviado un correo a tu bandeja de entrada, ingresa el código de verificación o haz clic en el enlace" });
};

const comprobarTokenPassword = async (req, res) => {
    if (!req.params.token) return res.status(404).json({ msg: "Lo sentimos, debe proporcionar un token" });

    const chefBDD = await chef.findOne({ token: req.params.token });

    if (chefBDD?.token !== req.params.token) return res.status(404).json({ msg: "Lo sentimos, el token es inválido" });
    
    await chefBDD.save();
    
    res.status(200).json({ msg: "Se ha validado la cuenta, ya puedes ya puedes crear tu nueva contraseña", id: chefBDD._id, verificationCode: chefBDD.verificationCode });
};

const verificarCodigo = async (req, res) => {
    const { verificationCode } = req.body;

    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Debes llenar todos los campos" });

    const chefBDD = await chef.findOne({ verificationCode });

    if (chefBDD.verificationCode != verificationCode) return res.status(404).json({ msg: "No se pudo validar la cuenta" });

    res.status(200).json({ msg: "Se ha validado la cuenta, ya puedes ya puedes crear tu nueva contraseña", id: chefBDD._id, verificationCode });
}

const nuevoPasswordChef = async (req, res) => {
    const { password, confirmPassword } = req.body;
    
    if (Object.values(req.body).includes("")) return res.status(404).json({ msg: "Debes llenar todos los campos" });

    if (password !== confirmPassword) return res.status(404).json({ msg: "Las contraseñas no coinciden" });

    const chefBDD = await chef.findById(req.query.i);
    
    if (chefBDD._id !== req.query.i && chefBDD?.verificationCode != req.query.v) return res.status(404).json({ msg: "No se pudo validar la cuenta" });

    chefBDD.token = null;
    chefBDD.verificationCode = null;
    chefBDD.password = await chefBDD.encryptPassword(password);
    
    await chefBDD.save();
    
    res.status(200).json({ msg: "Se ha actualizado la contraseña correctamente, ya puedes iniciar sesión" });
};

export {
    listarChefs,
    registroChefs,
    confirmEmailChefs,
    loginChefs,
    perfilChef,
    actualizarPerfilChef,
    actualizarContrasenaChef,
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPasswordChef,
    verificarCodigo,
};
