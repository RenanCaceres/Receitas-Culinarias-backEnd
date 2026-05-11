const db = require('../config/db_sequelize');

module.exports = {
    // ── Área pública ─────────────────────────────────────────────────────────

    async getListPublica(req, res) {
        db.Receita.findAll()
        .then(receitas => {
            res.render('publico/receitasPublicas', {
                receitas: receitas.map(r => r.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getListPorCategoria(req, res) {
        const where = req.params.categoriaId
            ? { categoriaId: req.params.categoriaId }
            : {};

        db.Receita.findAll({ where })
        .then(receitas => {
            res.render('publico/receitasPorCategoria', {
                receitas: receitas.map(r => r.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    // ── Área logada ──────────────────────────────────────────────────────────

    async getCreate(req, res) {
        var categorias = await db.Categoria.findAll();
        var usuarios   = await db.Usuario.findAll();

        res.render('receita/receitaCreate', {
            categorias: categorias.map(catg => catg.toJSON()),
            alunos:     usuarios.map(u => u.toJSON())
        });
    },

    async postCreate(req, res) {
        db.Receita.create(req.body)
        .then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Receita.findAll()
        .then(receitas => {
            res.render('receita/receitaList', {
                receitas: receitas.map(r => r.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        var categorias = await db.Categoria.findAll();
        var usuarios   = await db.Usuario.findAll();

        await db.Receita.findByPk(req.params.id)
        .then(receita => res.render('receita/receitaUpdate', {
            receita:    receita.dataValues,
            categorias: categorias.map(catg => catg.toJSON()),
            alunos:     usuarios.map(u => u.toJSON())
        }))
        .catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Receita.update(req.body, {
            where: { id: req.body.id }
        }).then(() => res.redirect('/home'))
        .catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Receita.destroy({
            where: { id: req.params.id }
        }).then(() => res.redirect('/home'))
        .catch(err => {
            console.log(err);
        });
    }
};