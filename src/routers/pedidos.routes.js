import {Router} from 'express'
import{
    cambiarEstado,
    detallePedido,
    eliminarPedido,
    registrarPedido
} from '../controllers/pedidos_controller.js'
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router = Router()

router.post('/pedido/registro', registrarPedido)
router.get('/pedido/:id', detallePedido)
router.put('/pedido/:id',verificarAutenticacion,cambiarEstado)
router.delete('/pedido/:id',verificarAutenticacion,eliminarPedido)

export default router