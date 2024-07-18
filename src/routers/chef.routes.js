import { Router } from 'express'
import {
    confirmEmailChefs,
    listarChefs,
    registroChefs,
    loginChefs,
    perfilChef,
    actualizarPerfilChef,
    actualizarContrasenaChef,
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPassword
} from '../controllers/chef_controller.js'
import verificarAutenticacion from '../middlewares/autenticacion.js'

const router = Router()

router.get('/chefs', verificarAutenticacion, listarChefs)
router.post('/registro', registroChefs)
router.get('/confirmar/:token', confirmEmailChefs)
router.post('/login', loginChefs)
router.get('/perfil', verificarAutenticacion, perfilChef)
router.put("/chef/:id", verificarAutenticacion, actualizarPerfilChef);
router.put('/chef/actualizarpassword', verificarAutenticacion, actualizarContrasenaChef);
router.post('/chef/recuperarpassword', recuperarPassword);
router.get('/chef/recuperarpassword/:token', comprobarTokenPassword);
router.post('/chef/nuevopassword/:token', nuevoPassword);

export default router