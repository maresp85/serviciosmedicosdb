const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

// ========================================
// Almacena las imágenes de los usuarios
// ========================================

const storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/usuarios')
    },
    filename: function (req, file, cb) {    
      cb(null, req.body.imagen);
    }
});

const upload = multer({ storage: storage });

// ========================================
// Obtiene todos los usuarios
// =======================================

app.get('/usuario', (req, res) => {

    Usuario.find({})
           .exec((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({}, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarioDB
                    });
                });
                
           });
});


// ==========================================
// Consultar todos los medicos especialistas
// ==========================================

app.get('/usuarioespecialista', (req, res) => {

    let email = req.params.email;

    Usuario.find({ especialista: 1 })
           .populate('especialidad')
           .exec((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({}, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarioDB
                    });
                });
                
           });
});



// ========================================
// Consultar un usuario a partir del ID
// ========================================

app.get('/unusuario/:email', (req, res) => {

    let email = req.params.email;

    Usuario.findOne({ email: email })
           .exec((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Usuario.count({}, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarioDB
                    });
                });
                
           });
});


// ========================================
// Crear nuevo usuario
// ========================================

app.post('/usuario', function (req, res) {
    
    let body = req.body;
   
    let usuario = new Usuario({
        nombre: body.nombre,
        identificacion: body.identificacion,
        email: body.email,    
        password: bcrypt.hashSync(body.password, 10),
        imagen: body.imagen,
        fechanacimiento: body.fechanacimiento,
        telefono: body.telefono,
        role: body.role,
        estado: body.estado
    });

    usuario.save((err, usuarioDB) => {
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });
    });

});

// ========================================
// Actualizar un usuario
// =======================================

app.put('/usuario/editar/:id', function (req, res) {
    
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
    
});


// ========================================
// Actualizar clave de un usuario
// =======================================

app.put('/usuario/editarclave/:id', function (req, res) {
    
    let id = req.params.id;
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    let body = _.pick(req.body, ['password']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
    
});

module.exports = app;