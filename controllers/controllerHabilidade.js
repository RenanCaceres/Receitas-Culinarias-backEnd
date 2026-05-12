const db = require('../config/db_sequelize');

module.exports = {
    async getRelatorio(req, res) {
        try {
            const habilidades = await db.Habilidade.findAll({ order: [['nome', 'ASC']] });
            const totalAlunos = await db.Usuario.count({ where: { tipo: 2 } });

            const dados = [];
            for (const habilidade of habilidades) {
                const registros = await db.AlunoHabilidade.findAll({
                    where: { habilidadeId: habilidade.id }
                });

                const alunosComHabilidade = registros.length;
                const somaNiveis = registros.reduce((total, item) => total + Number(item.nivel || 0), 0);
                const proporcao = totalAlunos > 0 ? Math.round((alunosComHabilidade / totalAlunos) * 100) : 0;
                const nivelMedio = alunosComHabilidade > 0 ? (somaNiveis / alunosComHabilidade).toFixed(1) : '0.0';

                dados.push({
                    id: habilidade.id,
                    nome: habilidade.nome,
                    alunosComHabilidade,
                    totalAlunos,
                    proporcao,
                    nivelMedio
                });
            }

            res.render('habilidade/relatorio', {
                layout: 'noMenu',
                totalAlunos,
                dados
            });
        } catch (err) {
            console.log(err);
            res.render('habilidade/relatorio', { layout: 'noMenu', totalAlunos: 0, dados: [] });
        }
    },

    async getCreate(req, res) {
        res.render('habilidade/habilidadeCreate');
    },

    async postCreate(req, res) {
        try {
            await db.Habilidade.create(req.body);
            res.redirect('/habilidadeList');
        } catch (err) {
            console.log(err);
            res.redirect('/habilidadeCreate');
        }
    },

    async getList(req, res) {
        try {
            const habilidades = await db.Habilidade.findAll({ order: [['id', 'ASC']] });
            res.render('habilidade/habilidadeList', {
                habilidades: habilidades.map(h => h.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    },

    async getUpdate(req, res) {
        try {
            const habilidade = await db.Habilidade.findByPk(req.params.id);
            if (!habilidade) return res.redirect('/habilidadeList');
            res.render('habilidade/habilidadeUpdate', { habilidade: habilidade.toJSON() });
        } catch (err) {
            console.log(err);
            res.redirect('/habilidadeList');
        }
    },

    async postUpdate(req, res) {
        try {
            await db.Habilidade.update(req.body, { where: { id: req.body.id } });
            res.redirect('/habilidadeList');
        } catch (err) {
            console.log(err);
            res.redirect('/habilidadeList');
        }
    },

    async getDelete(req, res) {
        try {
            await db.Habilidade.destroy({ where: { id: req.params.id } });
            res.redirect('/habilidadeList');
        } catch (err) {
            console.log(err);
            res.redirect('/habilidadeList');
        }
    }
};
