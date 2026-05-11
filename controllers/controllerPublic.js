const db = require('../config/db_sequelize');
const path = require('path');

module.exports = {
    async getReceitas(req, res) {
        db.Receita.findAll()
        .then(receitas => {
            res.render('publico/receitas', {
                receitas: receitas.map(receita => receita.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getReceitasPorCategoria(req, res) {
        db.Receita.findAll({
            where: { categoriaId: req.params.id }
        }).then(receitas => {
            res.render('publico/receitasPorCategoria', {
                receitas: receitas.map(receita => receita.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getRelatorioHabilidades(req, res) {
        db.Habilidade.findAll()
        .then(habilidades => {
            res.render('publico/relatorioHabilidades', {
                habilidades: habilidades.map(hab => hab.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    }
};
