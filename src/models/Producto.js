import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
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
    },
    foto: {
        type: {
            url: String,
            public_id: String,
        },
        default: null,
    },
},
{
    timestamps: true,
});

export default model('Producto', productoSchema)