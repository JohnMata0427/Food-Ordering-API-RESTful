import { Router } from "express";
import { registrarPedido, detallePedido, cambiarEstado, eliminarPedido, obtenerPedidosEstudiante, obtenerPedidos } from "../controllers/pedidos_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();

router.post("/pedido/registro", verificarAutenticacion, registrarPedido);
router.get("/pedidos", verificarAutenticacion, obtenerPedidos);
router.get("/pedido/:id", verificarAutenticacion, detallePedido);
router.get("/pedidos/estudiante", verificarAutenticacion, obtenerPedidosEstudiante);
router.put("/pedido/:id", verificarAutenticacion, cambiarEstado);
router.delete("/pedido/:id", verificarAutenticacion, eliminarPedido);

export default router;
