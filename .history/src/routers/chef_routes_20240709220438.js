import {Router} from 'express'
const router = Router()


import {
    listarChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)
router.post('/registro',regi)
router.get('/confirmar/:token',(req,res)=>res.send("confirmar email"))


export default router