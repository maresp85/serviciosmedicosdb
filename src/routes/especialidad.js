const express = require('express');

let app = express();

let especialidad = require('../models/especialidad');

// =============================
// Consultar especialidades
// =============================
app.get('/especialidad/listar', (req, res) => {

    especialidad.find({})
                .exec((err, especialidadDB) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }

                    res.json({
                        ok: true,
                        especialidadDB
                    });
                        
    });

});

// =============================
// Crear especialidad
// =============================
app.post('/especialidad/crear', (req, res) => {
   
    let body = req.body;

    let data = new especialidad({
        nombre: body.nombre
    });

    data.save((err, especialidadDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!especialidadDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            especialidadDB
        });

    });
});

module.exports = app;