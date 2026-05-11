const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getCreate(req, res) {
        res.render('habilidade/habilidadeCreate');
    },

    async postCreate(req, res) {
        db.Habilidade.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Habilidade.findAll()
        .then(habilidades => {
            res.render('habilidade/habilidadeList', {
                habilidades: habilidades.map(hab => hab.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.Habilidade.findByPk(req.params.id)
        .then(
            habilidade => res.render('habilidade/habilidadeUpdate', {
                habilidade: habilidade.dataValues
            })
        ).catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Habilidade.update(req.body, {
            where: { id: req.body.id }
        }).then(res.render('home'))
        .catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Habilidade.destroy({
            where: { id: req.params.id }
        }).then(res.render('home'))
        .catch(err => {
            console.log(err);
        });
    }
};
