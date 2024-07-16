import { Router } from "express"

import { eliminarEstudiantes, registroEstudiantes } from "../controllers/estudiantes_controller.js"

const router = Router()

router.post('/estudiantes/registro', registroEstudiantes)

router.delete('/estudiantes/:id', eliminarEstudiantes)



export default router
