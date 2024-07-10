import {Router} from 'express'
const router = Router()


import {
    listarChefs,
    registroChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)
router.post('/registro',registroChefs)
router.get('/confirmar/:token',confirm)


export default router