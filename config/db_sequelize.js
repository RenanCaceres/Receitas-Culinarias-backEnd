const Sequelize = require('sequelize');
const sequelize = new Sequelize('portifolio_receitas', 'postregres', '1234',
    { host: 'localhost', dialect: 'postgres'});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/relational/usuario.js') ( sequelize, Sequelize);

module.exports = db;