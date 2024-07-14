//Importar el esquema y el modelo de mongoose
import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"

const chefSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    especialidad: {
        type: String,
        trim: true,
        default: null
    },
    trayectoria: {
        type: String,
        trim: true,
        default: null
    },
    foto: {
        type: Object,
        default: null
    }
}, {
    timestamps: true
});

// Método para cifrar el password del veterinario
chefSchema.methods.encrypPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
chefSchema.methods.matchPassword = async function (password) {
    const response = await bcrypt.compare(password, this.password)
    return response
}

// Método para crear un token === OTP === 2FA 
chefSchema.methods.crearToken = function () {
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Chef', chefSchema)