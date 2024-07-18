import { Schema, model, Types } from "mongoose";

const pedidoSchema = new Schema({
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pendiente", "Entregado", "Cancelado"],
        default: "Pendiente",
    },
    fechaEntrega: {
        type: Date,
        required: true,
    },
    notas: {
        type: String,
        trim: true,
        default: null,
    },
    estudiante: {
        type: Types.ObjectId,
        ref: "Estudiante",
    },
    productos: [{
        producto: { type: Types.ObjectId, ref: "Producto", required: true },
        cantidad: { type: Number, required: true },
    }],
},
{
    timestamps: true,
});

// Método para calcular el total del pedido
pedidoSchema.methods.calcularTotal = function () {
    return this.productos.reduce((acc, el) => acc + el.producto.precio * el.cantidad, 0);
};

export default model("Pedido", pedidoSchema);
