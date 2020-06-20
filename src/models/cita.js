const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const moment = require('moment-timezone');
const dateColombia = moment.tz(Date.now(), "America/Bogota");

let estadosValidos = {
    values: ['CONFIRMADA', 'CUMPLIDA', 'PENDIENTE_PAGO', 'ANULADA', 'REPROGRAMADA'],
    message: "{VALUE} no es un estado válido"
}

let citaSchema = new Schema({
    id: { type: Number, unique: true, min: 1 },   
    fecha: { type: Date, default: dateColombia, required: [true, 'La fecha es obligatoria'] },
    estado: { type: String, default: 'CONFIRMADA', enum: estadosValidos },
    servicio: { type: Schema.Types.ObjectId, ref: 'servicio' },  
    paciente: { type: Schema.Types.ObjectId, ref: 'usuario' },
    medico: { type: Schema.Types.ObjectId, ref: 'usuario' },    
});

autoIncrement.initialize(mongoose.connection);
citaSchema.plugin(autoIncrement.plugin, { model: 'cita', 
                                          field: 'id',
                                          startAt: 1,
                                          incrementBy: 1 });

module.exports = mongoose.model('cita', citaSchema);