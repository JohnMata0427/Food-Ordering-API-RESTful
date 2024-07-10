import {Router} from 'express'
const router = Router()


import {
    listarChefs
}from '../controllers/chef_controller.js'


router.get('/chefs', listarChefs)


export default router