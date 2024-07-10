import {Router} from 'express'
const router = Router()


import {
    confirmEmailChefs,
    listarChefs,
    registroChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)
router.post('/registro',registroChefs)
router.get('/confirmar/:token',confirmEmailChefs)


export default router