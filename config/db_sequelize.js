const Sequelize = require('sequelize');
 
const sequelize = new Sequelize('portfolio_receitas', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});
 
var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.Usuario    = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.Receita    = require('../models/relational/receita.js')(sequelize, Sequelize);
db.Categoria  = require('../models/relational/categoria.js')(sequelize, Sequelize);
db.Habilidade = require('../models/relational/habilidade.js')(sequelize, Sequelize);
 
// Associações
db.Categoria.hasMany(db.Receita, { foreignKey: 'categoriaId', onDelete: 'NO ACTION' });
db.Receita.belongsTo(db.Categoria, { foreignKey: 'categoriaId' });
 
module.exports = db;