import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
        trim: true,
        enum: ['Almuerzo', 'Bebida', 'Snack'],
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    foto: {
        type: {
            url: String,
            public_id: String,
        },
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
});

export default model('Producto', productoSchema)