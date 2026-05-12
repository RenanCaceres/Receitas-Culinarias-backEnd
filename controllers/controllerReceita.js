const db = require('../config/db_sequelize');

function arrayFromBody(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
}

async function montarDadosFormulario(receita = null) {
    const categorias = await db.Categoria.findAll({ order: [['nome', 'ASC']] });
    const alunos = await db.Usuario.findAll({ where: { tipo: 2 }, order: [['nome', 'ASC']] });

    const categoriasSelecionadas = receita
        ? (await receita.getCategorias()).map(c => String(c.id))
        : [];

    const responsaveisSelecionados = receita
        ? (await receita.getResponsaveis()).map(u => String(u.id))
        : [];

    return {
        categorias: categorias.map(c => ({
            ...c.toJSON(),
            selecionada: categoriasSelecionadas.includes(String(c.id))
        })),
        alunos: alunos.map(u => ({
            ...u.toJSON(),
            selecionado: responsaveisSelecionados.includes(String(u.id))
        }))
    };
}

module.exports = {
    async getListPublica(req, res) {
        try {
            const receitas = await db.Receita.findAll({
                include: [
                    { model: db.Categoria, as: 'Categorias' },
                    { model: db.Usuario, as: 'Responsaveis' }
                ],
                order: [['nome', 'ASC']]
            });

            res.render('receita/receitaListPublica', {
                layout: 'noMenu',
                receitas: receitas.map(r => r.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.render('receita/receitaListPublica', { layout: 'noMenu', receitas: [] });
        }
    },

    async getListPorCategoria(req, res) {
        try {
            const categorias = await db.Categoria.findAll({ order: [['nome', 'ASC']] });
            const categoriaId = req.params.categoriaId || req.query.categoriaId;

            let receitas = [];
            if (categoriaId) {
                receitas = await db.Receita.findAll({
                    include: [
                        { model: db.Categoria, as: 'Categorias', where: { id: categoriaId } },
                        { model: db.Usuario, as: 'Responsaveis' }
                    ],
                    order: [['nome', 'ASC']]
                });
            }

            const categoriaAtual = categorias.find(c => String(c.id) === String(categoriaId));

            res.render('receita/receitaListCategoria', {
                layout: 'noMenu',
                categorias: categorias.map(c => ({
                    ...c.toJSON(),
                    selecionada: String(c.id) === String(categoriaId)
                })),
                categoriaSelecionada: categoriaId,
                nomeCategoriaSelecionada: categoriaAtual ? categoriaAtual.nome : '',
                receitas: receitas.map(r => r.toJSON())
            });
        } catch (err) {
            console.log(err);
            res.redirect('/receitasPublicas');
        }
    },

    async getCreate(req, res) {
        try {
            const dados = await montarDadosFormulario();
            res.render('receita/receitaCreate', dados);
        } catch (err) {
            console.log(err);
            res.redirect('/receitaList');
        }
    },

    async postCreate(req, res) {
        try {
            const categorias = arrayFromBody(req.body.categorias);
            const responsaveis = arrayFromBody(req.body.responsaveis);

            if (!responsaveis.includes(String(req.session.alunoId))) {
                responsaveis.push(String(req.session.alunoId));
            }

            const receita = await db.Receita.create({
                nome: req.body.nome,
                descricao: req.body.descricao,
                ingredientes: req.body.ingredientes || 'Não informado',
                preparo: req.body.preparo || 'Não informado',
                linkExterno: req.body.linkExterno || null
            });

            await receita.setCategorias(categorias);
            await receita.setResponsaveis(responsaveis);

            res.redirect('/receitaList');
        } catch (err) {
            console.log(err);
            res.redirect('/receitaCreate');
        }
    },

    async getList(req, res) {
        try {
            const include = [
                { model: db.Categoria, as: 'Categorias' },
                { model: db.Usuario, as: 'Responsaveis' }
            ];

            const receitas = await db.Receita.findAll({ include, order: [['nome', 'ASC']] });
            const lista = receitas
                .map(r => r.toJSON())
                .filter(r => Number(req.session.tipo) === 1 || (r.Responsaveis || []).some(u => u.id === req.session.alunoId));

            res.render('receita/receitaList', { receitas: lista });
        } catch (err) {
            console.log(err);
            res.redirect('/home');
        }
    },

    async getUpdate(req, res) {
        try {
            const receita = await db.Receita.findByPk(req.params.id, {
                include: [{ model: db.Usuario, as: 'Responsaveis' }]
            });
            if (!receita) return res.redirect('/receitaList');

            const podeEditar = Number(req.session.tipo) === 1 ||
                receita.Responsaveis.some(u => u.id === req.session.alunoId);

            if (!podeEditar) return res.redirect('/receitaList');

            const dados = await montarDadosFormulario(receita);
            res.render('receita/receitaUpdate', {
                receita: receita.toJSON(),
                ...dados
            });
        } catch (err) {
            console.log(err);
            res.redirect('/receitaList');
        }
    },

    async postUpdate(req, res) {
        try {
            const receita = await db.Receita.findByPk(req.body.id, {
                include: [{ model: db.Usuario, as: 'Responsaveis' }]
            });
            if (!receita) return res.redirect('/receitaList');

            const podeEditar = Number(req.session.tipo) === 1 ||
                receita.Responsaveis.some(u => u.id === req.session.alunoId);

            if (!podeEditar) return res.redirect('/receitaList');

            await receita.update({
                nome: req.body.nome,
                descricao: req.body.descricao,
                ingredientes: req.body.ingredientes || 'Não informado',
                preparo: req.body.preparo || 'Não informado',
                linkExterno: req.body.linkExterno || null
            });

            await receita.setCategorias(arrayFromBody(req.body.categorias));
            await receita.setResponsaveis(arrayFromBody(req.body.responsaveis));

            res.redirect('/receitaList');
        } catch (err) {
            console.log(err);
            res.redirect('/receitaList');
        }
    },

    async getDelete(req, res) {
        try {
            const receita = await db.Receita.findByPk(req.params.id, {
                include: [{ model: db.Usuario, as: 'Responsaveis' }]
            });
            if (!receita) return res.redirect('/receitaList');

            const podeExcluir = Number(req.session.tipo) === 1 ||
                receita.Responsaveis.some(u => u.id === req.session.alunoId);

            if (!podeExcluir) return res.redirect('/receitaList');

            await receita.destroy();
            res.redirect('/receitaList');
        } catch (err) {
            console.log(err);
            res.redirect('/receitaList');
        }
    }
};
