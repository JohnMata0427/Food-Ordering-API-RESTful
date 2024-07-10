import {Router} from 'express'
const router = Router()

router.post('/login',(req,res)=>res.send("login"))

router.post('/registro',(req,res)=>res.send("registro"))

import {
    listarChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)


export default router