const express = require('express');

let app = express();

let servicio = require('../models/servicio');

// =============================
// Consultar servicios
// =============================
app.get('/servicio/listar', (req, res) => {

    servicio.find({})
            .exec((err, servicioDB) => {
                if ( err ) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                res.json({
                    ok: true,
                    servicioDB
                });
                        
    });

});

// =============================
// Crear servicio
// =============================
app.post('/servicio/crear', (req, res) => {
   
    let body = req.body;

    let data = new servicio({
        nombre: body.nombre
    });

    data.save((err, servicioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!servicioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            servicioDB
        });

    });
});

module.exports = app;