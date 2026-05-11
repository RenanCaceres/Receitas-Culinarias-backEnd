const Comentario = require('../models/noSql/comentario');
const mongoose   = require('mongoose');
const StringCon  = require('../config/db_mongoose');

module.exports = {
    async getCreate(req, res) {
        res.render('comentario/comentarioCreate');
    },

    async postCreate(req, res) {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(StringCon.connection);
        }

        Comentario.create(req.body)
        .then(() => {
            res.redirect('/comentarioList');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(StringCon.connection);
        }

        Comentario.find()
        .then(comentarios => {
            res.render('comentario/comentarioList', {
                comentarios: comentarios.map(c => c.toObject())
            });
        }).catch((err) => {
            console.log(err);
        });
    }
};