//Importar el esquema y el modelo de mongoose
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const chefSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: Number,
        trim: true,
        unique: true,
        default: null,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
    especialidad: {
        type: String,
        trim: true,
        default: null,
    },
    trayectoria: {
        type: String,
        trim: true,
        default: null,
    },
    foto: {
        url: { type: String, default: null },
        public_id: { type: String, default: null },
    }
},
{
    timestamps: true,
});

chefSchema.methods.encryptPassword = async (password) => {
    return await bcrypt.hash(password, await bcrypt.genSalt(10));
};

chefSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

chefSchema.methods.crearToken = function () {
    return this.token = Math.random().toString(36).slice(2);
};

export default model("Chef", chefSchema);