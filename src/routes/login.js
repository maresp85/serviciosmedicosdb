const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    console.log(body);

    Usuario.findOne({ identificacion: body.identificacion, 
                      estado: 1 }, (err, usuarioDB) => {
       
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario incorrecto'
                }
            });
        }

        var date = new Date(usuarioDB.fechanacimiento);

        if (date.getMonth()+1 < 10) {
            month = '0' + (date.getMonth()+1)
        } else {
            month = date.getMonth()+1
        }

        var newdate = date.getFullYear() + '-' + month + '-' + date.getDate()
        
        if (newdate != body.fechanacimiento) {         
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario incorrecto'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CAD_TOKEN });

        res.json({
            ok: true,
            usuarioDB,
            token
        });

    });

  
});

module.exports = app;