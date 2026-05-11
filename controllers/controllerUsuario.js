const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getLogin(req, res) {
        res.render('aluno/login', { layout: 'noMenu.handlebars' });
    },

    async postLogin(req, res) {
        db.Aluno.findAll({
            where: { login: req.body.login, senha: req.body.senha }
        }).then(alunos => {
            if (alunos.length > 0) {
                req.session.login = req.body.login;
                req.session.alunoId = alunos[0].dataValues.id;
                req.session.tipo = alunos[0].dataValues.tipo;
                res.locals.login = req.body.login;

                if (alunos[0].dataValues.tipo == 2) {
                    res.locals.admin = true;
                }

                res.render('home');
            } else {
                res.redirect('/');
            }
        }).catch((err) => {
            console.log(err);
        });
    },

    async getLogout(req, res) {
        req.session.destroy();
        res.redirect('/');
    },

    async getCreate(req, res) {
        res.render('aluno/alunoCreate');
    },

    async postCreate(req, res) {
        db.Aluno.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Aluno.findAll().then(alunos => {
            res.render('aluno/alunoList', {
                alunos: alunos.map(aluno => aluno.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.Aluno.findByPk(req.params.id).then(
            aluno => res.render('aluno/alunoUpdate', {
                aluno: aluno.dataValues
            })
        ).catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Aluno.update(req.body, {
            where: { id: req.body.id }
        }).then(res.render('home'))
        .catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Aluno.destroy({
            where: { id: req.params.id }
        }).then(res.render('home'))
        .catch(err => {
            console.log(err);
        });
    }
};
