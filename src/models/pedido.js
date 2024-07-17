// Importar el esquema y el modelo de mongoose
import { Schema, model } from 'mongoose'

const pedidoSchema = new Schema({
    estudiante: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'estudiante'
    },
    productos: [{
        type: String,
        required: true,
        trim: true
    }],
    cantidad: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pendiente', 'Completado'],
        default: 'Pendiente'
    },
    fechaEntrega: {
        type: Date,
        required: true
    },
    notas: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});

// Método para actualizar el estado del pedido
pedidoSchema.methods.actualizarStatus = function (nuevoStatus) {
    this.status = nuevoStatus;
    return this.save();
}

// Método para calcular el total del pedido
pedidoSchema.methods.calcularTotal = function (preciosProductos) {
    this.total = this.productos.reduce((total, producto, index) => {
        return total + (preciosProductos[producto] * this.cantidad[index]);
    }, 0);
    return this.total;
}

export default model('pedido', pedidoSchema)
