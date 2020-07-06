const express = require('express');
var moment = require('moment');  
let app = express();

let cita = require('../models/cita');

// =============================
// Consultar Citas
// =============================
app.get('/cita/listar/:paciente', (req, res) => {

    let paciente = req.params.paciente;

    cita.find({ paciente: paciente })
        .populate('servicio')
        .populate('medico')
        .populate('paciente')      
        .sort([['id', -1]])      
        .exec((err, citaDB) => {
            if ( err ) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                citaDB
            });
                        
    });

});

// =============================
// Crear Obra
// =============================
app.post('/cita/crear', (req, res) => {
   
    let body = req.body;
    let dateTime = moment(body.fecha + ' ' + body.hora, 'DD/MM/YYYY HH:mm');

    let data = new cita({
        servicio: body.servicio,
        medico: body.medico,
        paciente: body.paciente,
        fecha: dateTime
    });

    data.save((err, citaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!citaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            citaDB
        });

    });
});

module.exports = app;