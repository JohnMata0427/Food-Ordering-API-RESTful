import { Schema, model, Types } from "mongoose";

const pedidoSchema = new Schema({
    total: {
        type: Number,
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

export default model("Pedido", pedidoSchema);
