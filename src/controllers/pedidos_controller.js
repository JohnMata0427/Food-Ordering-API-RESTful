import pedido from "../models/pedido.js"
import mongoose from "mongoose";

const registrarPedido = async (req, res) => {
    try {
        const pedidos = await pedido.create(req.body)
        res.status(200).json({msg:`Registro exitoso del pedido ${pedidos._id}`, pedidos})
    } catch (error) {
        res.status(500).json({msg: "Error al registrar un pedido", error})
    }
}

const detallePedido = async (req, res) => {
    
    try {
        const {id} = req.params
        const pedidos = await pedido.findById(id)
        res.status(200).json(pedidos)
    } catch (error) {
        res.status(500).json({msg: "Error al mostrar el pedido", error})
    }
}


const cambiarEstado = async (req, res) => {
    try {
        await pedido.findByIdAndUpdate(req.params.id, { estado: 'entregado' });
        res.status(200).json({ msg: "Estado del Pedido modificado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al modificar el estado del pedido", error });
    }
};



const eliminarPedido= async(req,res)=>{
    const {id} = req.params
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe ese pedido`})
    await pedido.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Pedido eliminado exitosamente"})
}

export{
    registrarPedido,
    detallePedido,
    cambiarEstado,
    eliminarPedido
}