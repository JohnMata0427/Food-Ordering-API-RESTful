import {Router} from 'express'
const router = Router()

router.get('/confirmar/:token',(req,res)=>res.send("confirmar email"))

import {
    listarChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)
router.post('/registro',(req,res)=>res.send("registro"))


export default router