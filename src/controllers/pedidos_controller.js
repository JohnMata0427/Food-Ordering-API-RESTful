import Pedido from "../models/pedido.js";
import Producto from "../models/Producto.js";
import { Types } from "mongoose";

const registrarPedido = async (req, res) => {

    const { _id } = req.estudianteBDD;
    
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });

    const { fechaEntrega, notas, productos } = req.body;

    let cantidadValida = true;
    let productoValido = true;
    let total = 0;

    for (let i = 0; i < productos.length; i++) {
        if (!Types.ObjectId.isValid(productos[i].producto)) {
            productoValido = false;
            break;
        }

        if (productos[i].cantidad <= 0) {
            cantidadValida = false;
            break;
        }

        let productoBDD = await Producto.findById(productos[i].producto);

        if (productoBDD.cantidad < productos[i].cantidad) {
            cantidadValida = false;
            break;
        }

        total += productoBDD.precio * productos[i].cantidad;

        productoBDD.cantidad -= productos[i].cantidad;

        await productoBDD.save();
    }


    if (!productoValido) return res.status(400).json({ msg: "Lo sentimos, debes ingresar un producto válido" });

    if (!cantidadValida) return res.status(400).json({ msg: "Lo sentimos, debes ingresar una cantidad válida, mayor a 0 y menor o igual a la cantidad en stock" });

    const nuevoPedido = new Pedido({
        fechaEntrega,
        estudiante: _id,
        productos,
        total,
        notas,
    });

    await nuevoPedido.save();

    res.status(200).json(nuevoPedido);
};

const obtenerPedidosEstudiante = async (req, res) => {
    const pedidos = await Pedido.find({ estudiante: req.estudianteBDD._id }).populate("productos.producto");

    if (!pedidos) return res.status(404).json({ msg: "Lo sentimos, no se encontraron pedidos" });

    res.status(200).json(pedidos);
}

const obtenerPedidos = async (req, res) => {
    const pedidos = await Pedido.find().populate('estudiante', 'nombre celular correo');

    if (!pedidos) return res.status(404).json({ msg: "Lo sentimos, no se encontraron pedidos" });

    res.status(200).json(pedidos);
}

const detallePedido = async (req, res) => {
    const { id } = req.params;

    const pedido = await Pedido.findById(id);

    if (!pedido) return res.status(404).json({ msg: "Lo sentimos, no se encontró el pedido" });

    res.status(200).json(pedido);
};

const cambiarEstado = async (req, res) => {
    try {
        await Pedido.findByIdAndUpdate(req.params.id, { status: "Entregado" });
        res.status(200).json({ msg: "Estado del Pedido modificado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al modificar el estado del pedido" });
    }
};

const eliminarPedido = async (req, res) => {
    try {
        await Pedido.findByIdAndUpdate(req.params.id, { status: "Cancelado" });
        res.status(200).json({ msg: "Estado del Pedido modificado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al modificar el estado del pedido" });
    }
};

export { registrarPedido, detallePedido, cambiarEstado, eliminarPedido, obtenerPedidosEstudiante, obtenerPedidos };
