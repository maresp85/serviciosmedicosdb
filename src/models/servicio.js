const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let servicioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio']},
});

module.exports = mongoose.model('servicio', servicioSchema);