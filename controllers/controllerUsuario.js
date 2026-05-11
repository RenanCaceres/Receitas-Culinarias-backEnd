const db = require('../config/db_sequelize');

module.exports = {
    async getLogin(req, res) {
        res.render('aluno/login', { layout: 'noMenu.handlebars' });
    },

    async postLogin(req, res) {
        db.Usuario.findAll({
            where: { login: req.body.login, senha: req.body.senha }
        }).then(usuarios => {
            if (usuarios.length > 0) {
                req.session.login    = req.body.login;
                req.session.alunoId  = usuarios[0].dataValues.id;
                req.session.tipo     = usuarios[0].dataValues.tipo;
                res.locals.login     = req.body.login;

                if (usuarios[0].dataValues.tipo == 1) {
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
        db.Usuario.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('aluno/alunoList', {
                alunos: usuarios.map(u => u.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.Usuario.findByPk(req.params.id).then(
            usuario => res.render('aluno/alunoUpdate', {
                aluno: usuario.dataValues
            })
        ).catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Usuario.update(req.body, {
            where: { id: req.body.id }
        }).then(() => res.redirect('/home'))
        .catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Usuario.destroy({
            where: { id: req.params.id }
        }).then(() => res.redirect('/home'))
        .catch(err => {
            console.log(err);
        });
    },

    // ── Habilidades do aluno logado ──────────────────────────────────────────

    async getMinhasHabilidades(req, res) {
        const habilidades = await db.Habilidade.findAll();
        const usuario = await db.Usuario.findByPk(req.session.alunoId, {
            include: [{ model: db.Habilidade, as: 'Habilidades' }]
        }).catch(() => null);

        res.render('aluno/minhasHabilidades', {
            habilidades: habilidades.map(h => h.toJSON()),
            minhasHabilidades: usuario ? usuario.Habilidades.map(h => h.toJSON()) : []
        });
    },

    async postSalvarHabilidades(req, res) {
        const alunoId     = req.session.alunoId;
        const habilidades = req.body.habilidades || [];

        // Remove todas as associações antigas e recria com os novos níveis
        await db.AlunoHabilidade.destroy({ where: { usuarioId: alunoId } });

        const registros = (Array.isArray(habilidades) ? habilidades : [habilidades])
            .map(h => ({
                usuarioId:    alunoId,
                habilidadeId: h.id,
                nivel:        h.nivel || 0
            }));

        if (registros.length > 0) {
            await db.AlunoHabilidade.bulkCreate(registros);
        }

        res.redirect('/home');
    }
};