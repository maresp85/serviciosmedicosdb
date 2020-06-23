const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['PACIENTE', 'ADMIN', 'MEDICO'],
    message: "{VALUE} no es un rol válido"
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },    
    identificacion: { type: String, required: true },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [false, 'La contraseña es obligatoria'] }, 
    imagen: { type: String, required: false },
    fechanacimiento: { type: Date, required: true },
    telefono: { type: String, required: false },
    role: { type: String, required: true, default: 'PACIENTE', enum: rolesValidos },
    estado: { type: Boolean, default: true },
    especialista: { type: Boolean, required: false, default: false },    
    especialidad: { type: Schema.Types.ObjectId, required: false, ref: 'especialidad' }, 
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: 'El {PATH} fue previamente registrado'
});

module.exports = mongoose.model('usuario', usuarioSchema);