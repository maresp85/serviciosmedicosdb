const express = require('express');

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

    let data = new cita({
        servicio: body.servicio,
        medico: body.medico,
        paciente: body.paciente,
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