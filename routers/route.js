// routers/route.js
const express              = require('express');
const db                   = require('../config/db_sequelize');
const controllerUsuario    = require('../controllers/controllerUsuario');
const controllerReceita    = require('../controllers/controllerReceita');
const controllerCategoria  = require('../controllers/controllerCategoria');
const controllerHabilidade = require('../controllers/controllerHabilidade');
const controllerComentario = require('../controllers/controllerComentario');

const route = express.Router();

// ── Criação do banco (descomentar apenas UMA vez, depois comentar novamente) ──
/*
db.sequelize.sync({ force: true }).then(() => {
    console.log('Banco criado!');
    db.Usuario.create({ login: 'admin', senha: '1234', tipo: 1, nome: 'Administrador' });
});
*/

module.exports = route;

// ─────────────────────────────────────────────────────────────────────────────
// ROTAS PÚBLICAS (sem login) — liberadas no middleware sessionControl
// ─────────────────────────────────────────────────────────────────────────────

route.get('/', controllerUsuario.getLogin);
route.post('/login', controllerUsuario.postLogin);
route.get('/logout', controllerUsuario.getLogout);

route.get('/receitasPublicas', controllerReceita.getListPublica);
route.get('/receitasPorCategoria', controllerReceita.getListPorCategoria);
route.get('/receitasPorCategoria/:categoriaId', controllerReceita.getListPorCategoria);
route.get('/relatorioHabilidades', controllerHabilidade.getRelatorio);

// ─────────────────────────────────────────────────────────────────────────────
// ÁREA LOGADA (sessão controlada pelo middleware sessionControl do app.js)
// ─────────────────────────────────────────────────────────────────────────────

route.get('/home', (req, res) => {
    res.render('home');
});

// ── Receitas ─────────────────────────────────────────────────────────────────

route.get('/receitaList',         controllerReceita.getList);
route.get('/receitaCreate',       controllerReceita.getCreate);
route.post('/receitaCreate',      controllerReceita.postCreate);
route.get('/receitaUpdate/:id',   controllerReceita.getUpdate);
route.post('/receitaUpdate',      controllerReceita.postUpdate);
route.get('/receitaDelete/:id',   controllerReceita.getDelete);

// ── Habilidades do aluno logado ──────────────────────────────────────────────

route.get('/minhasHabilidades',   controllerUsuario.getMinhasHabilidades);
route.post('/minhasHabilidades',  controllerUsuario.postSalvarHabilidades);

// ── Comentários (persistidos no MongoDB) ─────────────────────────────────────

route.get('/comentarioCreate',    controllerComentario.getCreate);
route.post('/comentarioCreate',   controllerComentario.postCreate);
route.get('/comentarioList',      controllerComentario.getList);

// ─────────────────────────────────────────────────────────────────────────────
// ÁREA DO ADMINISTRADOR (tipo == 1, validado pelo middleware)
// ─────────────────────────────────────────────────────────────────────────────

// Usuários
route.get('/usuarioList',          controllerUsuario.getList);
route.get('/usuarioCreate',        controllerUsuario.getCreate);
route.post('/usuarioCreate',       controllerUsuario.postCreate);
route.get('/usuarioUpdate/:id',    controllerUsuario.getUpdate);
route.post('/usuarioUpdate',       controllerUsuario.postUpdate);
route.get('/usuarioDelete/:id',    controllerUsuario.getDelete);

// Categorias
route.get('/categoriaList',        controllerCategoria.getList);
route.get('/categoriaCreate',      controllerCategoria.getCreate);
route.post('/categoriaCreate',     controllerCategoria.postCreate);
route.get('/categoriaUpdate/:id',  controllerCategoria.getUpdate);
route.post('/categoriaUpdate',     controllerCategoria.postUpdate);
route.get('/categoriaDelete/:id',  controllerCategoria.getDelete);

// Habilidades
route.get('/habilidadeList',       controllerHabilidade.getList);
route.get('/habilidadeCreate',     controllerHabilidade.getCreate);
route.post('/habilidadeCreate',    controllerHabilidade.postCreate);
route.get('/habilidadeUpdate/:id', controllerHabilidade.getUpdate);
route.post('/habilidadeUpdate',    controllerHabilidade.postUpdate);
route.get('/habilidadeDelete/:id', controllerHabilidade.getDelete);
