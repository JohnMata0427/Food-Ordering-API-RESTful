import { Schema , model } from "mongoose";
import bcrypt from "bcryptjs";

const estudianteSchema = new Schema({
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
    telefono:{
        type: String,
        required: true,
        trim: true
    },
    facultad:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type: String,
        default:null
    },
    confirmEmail:{
        type: Boolean,
        default: null
    }
})

estudianteSchema.methods.encrypPassword = async function ( password ) { 
    const passwordEncryp = await bcrypt.hash( password , await bcrypt.genSalt(10));
    return passwordEncryp;
};

estudianteSchema.methods.matchPassword = async function ( password ) {
    return await bcrypt.compare(password, this.password);
};

estudianteSchema.methods.crearToken = function () {
    const tokenGenerado = this.token = Math.random().toString(36).slice(2);
    return tokenGenerado;
}

export default model('estudiante' , estudianteSchema);