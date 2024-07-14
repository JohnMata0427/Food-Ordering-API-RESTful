import jwt from "jsonwebtoken"
import chef from "../models/chef.js"

const verificarAutenticacion = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(404).json({ msg: "Lo sentimos, debes proprocionar un token" })
    const { authorization } = req.headers
    try {
        const { id, rol } = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET)
        if (rol == "chef") {
            req.chefBDD = await chef.findById(id).lean().select("-password")
            next()
        } else if (rol == "estudiante") {
            pass
            next()
        }
    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({ msg: e.message })
    }
}

export default verificarAutenticacion