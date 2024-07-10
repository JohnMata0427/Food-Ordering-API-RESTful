import {Router} from 'express'
const router = Router()


import {
    confirmEmailChefs,
    listarChefs,
    registroChefs,
    loginChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)
router.post('/registro',registroChefs)
router.get('/confirmar/:token',confirmEmailChefs)
router.post('/login',loginChefs) 


export default router