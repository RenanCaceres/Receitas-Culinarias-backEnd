const db = require('../config/db_sequelize');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu' });
    },

    async postLogin(req, res) {
        try {
            const usuario = await db.Usuario.findOne({
                where: { login: req.body.login, senha: req.body.senha }
            });

            if (!usuario) {
                return res.render('usuario/login', {
                    layout: 'noMenu',
                    erro: 'Login ou senha inválidos.'
                });
            }

            req.session.login = usuario.login;
            req.session.alunoId = usuario.id;
            req.session.tipo = usuario.tipo;

            res.redirect('/home');
        } catch (err) {
            console.log(err);
            res.render('usuario/login', {
                layout: 'noMenu',
                erro: 'Erro ao fazer login.'
            });
        }
    },

    async getLogout(req, res) {
        req.session.destroy(() => res.redirect('/'));
    },

    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },

    async postCreate(req, res) {
        try {
            await db.Usuario.create(req.body);
            res.redirect('/usuarioList');
        } catch (err) {
            console.log(err);
            res.redirect('/usuarioCreate');
        }
    },

    async getList(req, res) {
        try {
            const usuarios = await db.Usuario.findAll({ order: [['id', 'ASC']] });
            res.render('usuario/usuarioList', {
                usuarios: usuarios.map(u => u.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    },

    async getUpdate(req, res) {
        try {
            const usuario = await db.Usuario.findByPk(req.params.id);
            if (!usuario) return res.redirect('/usuarioList');

            res.render('usuario/usuarioUpdate', {
                usuario: usuario.toJSON()
            });
        } catch (err) {
            console.log(err);
            res.redirect('/usuarioList');
        }
    },

    async postUpdate(req, res) {
        try {
            await db.Usuario.update(req.body, {
                where: { id: req.body.id }
            });

            res.redirect('/usuarioList');
        } catch (err) {
            console.log(err);
            res.redirect('/usuarioList');
        }
    },

    async getDelete(req, res) {
        try {
            await db.Usuario.destroy({
                where: { id: req.params.id }
            });

            res.redirect('/usuarioList');
        } catch (err) {
            console.log(err);
            res.redirect('/usuarioList');
        }
    },

    async getMinhasHabilidades(req, res) {
        try {
            const habilidades = await db.Habilidade.findAll({
                order: [['nome', 'ASC']]
            });

            const minhas = await db.AlunoHabilidade.findAll({
                where: { usuarioId: req.session.alunoId }
            });

            const mapa = {};

            minhas.forEach(item => {
                mapa[item.habilidadeId] = item.nivel;
            });

            const todasHabilidades = habilidades.map(habilidade => ({
                ...habilidade.toJSON(),
                selecionada: mapa[habilidade.id] !== undefined,
                nivel: mapa[habilidade.id] !== undefined ? mapa[habilidade.id] : 0
            }));

            res.render('usuario/minhasHabilidades', {
                todasHabilidades
            });
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    },

    async postSalvarHabilidades(req, res) {
        try {
            const alunoId = req.session.alunoId;

            let ids = req.body.habilidades || [];

            if (!Array.isArray(ids)) {
                ids = [ids];
            }

            await db.AlunoHabilidade.destroy({
                where: { usuarioId: alunoId }
            });

            const registros = ids.map(id => {
                const nivelDigitado = Number(req.body[`nivel_${id}`] || 0);

                return {
                    usuarioId: alunoId,
                    habilidadeId: Number(id),
                    nivel: Math.max(0, Math.min(10, nivelDigitado))
                };
            });

            if (registros.length > 0) {
                await db.AlunoHabilidade.bulkCreate(registros);
            }

            res.redirect('/minhasHabilidades');
        } catch (err) {
            console.log(err);
            res.redirect('/minhasHabilidades');
        }
    }
};