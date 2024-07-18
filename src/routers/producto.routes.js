import { Router } from "express";
import {
    registrarProducto,
    detalleProducto,
    eliminarProducto,
    obtenerProductos,
    actualizarProducto,
} from "../controllers/producto_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();

router.post("/productos/registro", verificarAutenticacion, registrarProducto);
router.get("/productos", obtenerProductos);
router.get("/productos/:id", detalleProducto);
router.put("/productos/:id", verificarAutenticacion, actualizarProducto);
router.delete("/productos/:id", verificarAutenticacion, eliminarProducto);

export default router;