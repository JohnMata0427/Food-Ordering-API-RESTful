import { Router } from 'express'
import {
    confirmEmailChefs,
    listarChefs,
    registroChefs,
    loginChefs,
    actualizarPerfilChef,
    actualizarContrasenaChef
} from '../controllers/chef_controller.js'
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router = Router()

router.get('/chefs', listarChefs)
router.post('/registro', registroChefs)
router.get('/confirmar/:token', confirmEmailChefs)
router.post('/login', loginChefs)
router.put("/chef/:id", verificarAutenticacion, actualizarPerfilChef);
router.put('/chef/actualizarpassword', verificarAutenticacion, actualizarContrasenaChef)

export default router