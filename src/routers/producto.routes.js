import { Router } from "express";
import {
    registrarProducto,
    detalleProducto,
    eliminarProducto,
    obtenerProductos,
    actualizarProducto,
    obtenerProductosPorCategoria
} from "../controllers/producto_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();

/**
 * @swagger
 * definitions:
 *  Producto:
 *   type: object
 *   properties:
 *    nombre:
 *     type: string
 *     example: Hamburguesa
 *    precio:
 *     type: number
 *     example: 10
 *    categoria:
 *     type: string
 *     example: Comidas
 *     enum:
 *      - Comidas
 *      - Bebidas
 *      - Snacks
 *    descripcion:
 *     type: string
 *     example: Hamburguesa de carne
 *    foto:
 *     type: object
 *     properties:
 *      url:
 *       type: string
 *      public_id:
 *       type: string
 *    cantidad:
 *     type: number
 *     example: 20
 *    estado:
 *     type: boolean
 *     example: true
 *    createdAt:
 *     type: string
 *    updatedAt:
 *     type: string
 *    __v:
 *     type: number
 *   required:
 *    - nombre
 *    - precio
 *    - categoria
 *    - descripcion
 *    - foto
 *    - cantidad
 *    - estado
 */

router.post("/productos/registro", verificarAutenticacion, registrarProducto);


/**
* @swagger
* /productos:
*  get:
*   summary: Obtener todos los productos
*   description: Obtener todos los productos registrados en la base de datos
*   responses:
*    200:
*     description: Lista de productos
*     content:
*      application/json:
*       schema:
*        $ref: '#/definitions/Producto'
*    400:
*     description: Error al obtener los productos
*    404:
*     description: No se encontraron productos
*    500:
*     description: Error del servidor
*/ 
router.get("/productos", obtenerProductos);
router.get("/productos/:categoria", obtenerProductosPorCategoria);
router.get("/producto/:id", detalleProducto);
router.put("/producto/:id", verificarAutenticacion, actualizarProducto);
router.delete("/producto/:id", verificarAutenticacion, eliminarProducto);

export default router;