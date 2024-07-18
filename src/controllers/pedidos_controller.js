import Pedido from "../models/pedido.js";
import { Types } from "mongoose";

const registrarPedido = async (req, res) => {

    const { id } = req.estudianteBDD;
    
    if (Object.values(req.body).includes("")) return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });

    const { productos } = req.body;

    productos.forEach((producto, cantidad) => {
        if (!Types.ObjectId.isValid(producto.producto))
            return res.status(400).json({ msg: "Lo sentimos, el id del producto no es válido" });

        if (typeof cantidad !== "number" || cantidad <= 0)
            return res.status(400).json({ msg: "Lo sentimos, la cantidad del producto no es válida" });
    });

    const nuevoPedido = new Pedido({
        ...req.body,
        estudiante: id,
    });

    nuevoPedido.total = nuevoPedido.calcularTotal();

    await nuevoPedido.save();

    res.status(200).json(nuevoPedido);
};

const obtenerPedidosEstudiante = async (req, res) => {
    const pedidos = await Pedido.find({ estudiante: req.estudianteBDD.id });

    if (!pedidos) return res.status(404).json({ msg: "Lo sentimos, no se encontraron pedidos" });

    res.status(200).json(pedidos);
}

const obtenerPedidos = async (req, res) => {
    const pedidos = await Pedido.find();

    if (!pedidos) return res.status(404).json({ msg: "Lo sentimos, no se encontraron pedidos" });

    res.status(200).json(pedidos);
}

const detallePedido = async (req, res) => {

    const { idPedido } = req.query;

    const pedido = await Pedido.find({ estudiante: req.estudianteBDD.id }).populate("productos.producto").where({ _id: idPedido });

    if (!pedido) return res.status(404).json({ msg: "Lo sentimos, no se encontró el pedido" });

    res.status(200).json(pedido);
};

const cambiarEstado = async (req, res) => {
    try {
        await Pedido.findByIdAndUpdate(req.params.id, { estado: "Entregado" });
        res.status(200).json({ msg: "Estado del Pedido modificado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al modificar el estado del pedido" });
    }
};

const eliminarPedido = async (req, res) => {
    try {
        await Pedido.findByIdAndUpdate(req.params.id, { estado: "Cancelado" });
        res.status(200).json({ msg: "Estado del Pedido modificado exitosamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al modificar el estado del pedido" });
    }
};

export { registrarPedido, detallePedido, cambiarEstado, eliminarPedido, obtenerPedidosEstudiante, obtenerPedidos };
