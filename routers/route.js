const express = require('express');
const db = require('../config/db_sequelize');

const middlewares = require('../middlewares/middlewares');

const controllerUsuario = require('../controllers/controllerUsuario');
const controllerReceita = require('../controllers/controllerReceita');
const controllerCategoria = require('../controllers/controllerCategoria');
const controllerHabilidade = require('../controllers/controllerHabilidade');
const controllerComentario = require('../controllers/controllerComentario');

const route = express.Router();

// CRIA O BANCO E OS DADOS INICIAIS
/*
db.sequelize.sync({ force: false }).then(async () => {
    console.log('Banco criado!');

    await db.Usuario.create({
        login: 'admin',
        senha: '1234',
        tipo: 1,
        nome: 'Administrador'
    });

    await db.Usuario.create({
        login: 'renan',
        senha: '1234',
        tipo: 2,
        nome: 'Aluno'
    });

    await db.Categoria.create({
        nome: 'Massas'
    });

    await db.Categoria.create({
        nome: 'Sobremesas'
    });

    await db.Categoria.create({
        nome: 'Salgados'
    });

    await db.Habilidade.create({
        nome: 'Corte de legumes'
    });

    await db.Habilidade.create({
        nome: 'Preparo de massas'
    });

    await db.Habilidade.create({
        nome: 'Confeitaria'
    });

    await db.Receita.create({
        nome: 'Macarrão ao Alho e Óleo',
        descricao: 'Receita simples e rápida de macarrão.',
        ingredientes: 'Macarrão, alho, óleo, sal e cheiro-verde.',
        preparo: 'Cozinhe o macarrão. Refogue o alho no óleo e misture tudo.',
        linkExterno: 'https://www.tudogostoso.com.br/'
    });

    await db.Receita.create({
        nome: 'Bolo de Chocolate',
        descricao: 'Bolo simples de chocolate.',
        ingredientes: 'Farinha, açúcar, ovos, leite, chocolate em pó e fermento.',
        preparo: 'Misture os ingredientes, coloque em uma forma e asse.',
        linkExterno: 'https://www.tudogostoso.com.br/'
    });

    await db.Receita.create({
        nome: 'Pão de Queijo',
        descricao: 'Receita tradicional de pão de queijo.',
        ingredientes: 'Polvilho, queijo, leite, óleo, ovos e sal.',
        preparo: 'Misture os ingredientes, faça bolinhas e asse.',
        linkExterno: 'https://www.tudogostoso.com.br/'
    });
});
*/

// PÁGINA INICIAL
route.get('/', (req, res) => {
    res.redirect('/receitasPublicas');
});

// LOGIN
route.get('/login', controllerUsuario.getLogin);
route.post('/login', controllerUsuario.postLogin);
route.get('/logout', controllerUsuario.getLogout);

// PÚBLICO
route.get('/receitasPublicas', controllerReceita.getListPublica);
route.get('/receitasPorCategoria', controllerReceita.getListPorCategoria);
route.get('/receitasPorCategoria/:categoriaId', controllerReceita.getListPorCategoria);
route.get('/relatorioHabilidades', controllerHabilidade.getRelatorio);

// HOME
route.get('/home', (req, res) => {
    res.render('home');
});

// RECEITAS
route.get('/receitaList', controllerReceita.getList);
route.get('/receitaCreate', controllerReceita.getCreate);
route.post('/receitaCreate', controllerReceita.postCreate);
route.get('/receitaUpdate/:id', controllerReceita.getUpdate);
route.post('/receitaUpdate', controllerReceita.postUpdate);
route.get('/receitaDelete/:id', controllerReceita.getDelete);

// MINHAS HABILIDADES
route.get('/minhasHabilidades', controllerUsuario.getMinhasHabilidades);
route.post('/minhasHabilidades', controllerUsuario.postSalvarHabilidades);

// COMENTÁRIOS
route.get('/comentarioCreate', controllerComentario.getCreate);
route.post('/comentarioCreate', controllerComentario.postCreate);
route.get('/comentarioList', controllerComentario.getList);

// ADMIN - USUÁRIOS
route.get('/usuarioList', middlewares.adminControl, controllerUsuario.getList);
route.get('/usuarioCreate', middlewares.adminControl, controllerUsuario.getCreate);
route.post('/usuarioCreate', middlewares.adminControl, controllerUsuario.postCreate);
route.get('/usuarioUpdate/:id', middlewares.adminControl, controllerUsuario.getUpdate);
route.post('/usuarioUpdate', middlewares.adminControl, controllerUsuario.postUpdate);
route.get('/usuarioDelete/:id', middlewares.adminControl, controllerUsuario.getDelete);

// ADMIN - CATEGORIAS
route.get('/categoriaList', middlewares.adminControl, controllerCategoria.getList);
route.get('/categoriaCreate', middlewares.adminControl, controllerCategoria.getCreate);
route.post('/categoriaCreate', middlewares.adminControl, controllerCategoria.postCreate);
route.get('/categoriaUpdate/:id', middlewares.adminControl, controllerCategoria.getUpdate);
route.post('/categoriaUpdate', middlewares.adminControl, controllerCategoria.postUpdate);
route.get('/categoriaDelete/:id', middlewares.adminControl, controllerCategoria.getDelete);

// ADMIN - HABILIDADES
route.get('/habilidadeList', middlewares.adminControl, controllerHabilidade.getList);
route.get('/habilidadeCreate', middlewares.adminControl, controllerHabilidade.getCreate);
route.post('/habilidadeCreate', middlewares.adminControl, controllerHabilidade.postCreate);
route.get('/habilidadeUpdate/:id', middlewares.adminControl, controllerHabilidade.getUpdate);
route.post('/habilidadeUpdate', middlewares.adminControl, controllerHabilidade.postUpdate);
route.get('/habilidadeDelete/:id', middlewares.adminControl, controllerHabilidade.getDelete);

module.exports = route;