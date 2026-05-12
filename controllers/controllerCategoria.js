const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        res.render('categoria/categoriaCreate');
    },

    async postCreate(req, res) {
        try {
            await db.Categoria.create(req.body);
            res.redirect('/categoriaList');
        } catch (err) {
            console.log(err);
            res.redirect('/categoriaCreate');
        }
    },

    async getList(req, res) {
        try {
            const categorias = await db.Categoria.findAll({ order: [['id', 'ASC']] });
            res.render('categoria/categoriaList', {
                categorias: categorias.map(catg => catg.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    },

    async getUpdate(req, res) {
        try {
            const categoria = await db.Categoria.findByPk(req.params.id);
            if (!categoria) return res.redirect('/categoriaList');
            res.render('categoria/categoriaUpdate', { categoria: categoria.toJSON() });
        } catch (err) {
            console.log(err);
            res.redirect('/categoriaList');
        }
    },

    async postUpdate(req, res) {
        try {
            await db.Categoria.update(req.body, { where: { id: req.body.id } });
            res.redirect('/categoriaList');
        } catch (err) {
            console.log(err);
            res.redirect('/categoriaList');
        }
    },

    async getDelete(req, res) {
        try {
            await db.Categoria.destroy({ where: { id: req.params.id } });
            res.redirect('/categoriaList');
        } catch (err) {
            console.log(err);
            res.redirect('/categoriaList');
        }
    }
};
