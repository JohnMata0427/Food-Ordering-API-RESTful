import { Router } from "express";
import verificarAutenticacion from "../middlewares/autenticacion.js";
import {
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
    detalleEstudiante,
} from "../controllers/estudiantes_controller.js";

const router = Router();

router.post("/estudiantes/registro", registroEstudiantes);
router.get("/estudiantes/confirmar/:token", confirmEmailEstudiantes);
router.post("/estudiantes/login", loginEstudiantes);
router.get("/estudiantes/perfil", verificarAutenticacion, perfilEstudiante);
router.put(
    "/estudiantes/:id",
    verificarAutenticacion,
    actualizarPerfilEstudiante
);
router.put(
    "/estudiantes/actualizarpassword",
    verificarAutenticacion,
    actualizarContrasenaEstudiante
);
router.post("/estudiantes/recuperarpassword", recuperarPassword);
router.get("/estudiantes/recuperarpassword/:token", comprobarTokenPassword);
router.post("/estudiantes/nuevopassword/:token", nuevoPassword);
router.delete("/estudiantes/:id", verificarAutenticacion, eliminarEstudiantes);

router.get("/estudiantes", verificarAutenticacion, listarEstudiantes);
router.get("/estudiantes/:id", verificarAutenticacion, detalleEstudiante);

export default router;
