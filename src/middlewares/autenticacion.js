import jwt from "jsonwebtoken"
import Chef from "../models/chef.js"
import Estudiante from "../models/estudiante.js"

const verificarAutenticacion = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(404).json({ msg: "Lo sentimos, debes proprocionar un token" });

    const { authorization } = req.headers;

    try {
        const { id, rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);

        if (rol == "chef") {
            req.chefBDD = await Chef.findById(id).lean().select("-password")
        } else if (rol == "estudiante") {
            req.estudianteBDD = await Estudiante.findById(id).lean().select("-password")
        }
        
        next()
    } catch (error) {
        console.log(error); // Para identificar el error
        return res.status(404).json({ msg: "Formato del token no válido" })
    }
}

export default verificarAutenticacion