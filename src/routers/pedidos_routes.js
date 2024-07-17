import {Router} from 'express'
import{
    cambiarEstado,
    eliminarPedido
} from '../controllers/pedidos_controller.js'
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router = Router()

router.put('/pedido/:id',verificarAutenticacion,cambiarEstado)
router.delete('/pedido/:id',verificarAutenticacion,eliminarPedido)

export default router