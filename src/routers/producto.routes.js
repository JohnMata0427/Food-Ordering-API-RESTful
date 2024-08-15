import { Router } from "express";
import {
    registrarProducto,
    detalleProducto,
    eliminarProducto,
    obtenerProductos,
    actualizarProducto,
    obtenerProductosPorCategoria
} from "../controllers/producto_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();

router.post("/productos/registro", verificarAutenticacion, registrarProducto);
router.get("/productos", obtenerProductos);
router.get("/productos/:categoria", obtenerProductosPorCategoria);
router.get("/producto/:id", detalleProducto);
router.put("/producto/:id", verificarAutenticacion, actualizarProducto);
router.delete("/producto/:id", verificarAutenticacion, eliminarProducto);

export default router;