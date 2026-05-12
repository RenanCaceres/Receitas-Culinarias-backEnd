const Sequelize = require('sequelize');

const sequelize = new Sequelize('portfolio_receitas', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario          = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.Receita          = require('../models/relational/receita.js')(sequelize, Sequelize);
db.Categoria        = require('../models/relational/categoria.js')(sequelize, Sequelize);
db.Habilidade       = require('../models/relational/habilidade.js')(sequelize, Sequelize);
db.AlunoHabilidade  = require('../models/relational/alunoHabilidade.js')(sequelize, Sequelize);
db.ReceitaAluno     = require('../models/relational/receitaAluno.js')(sequelize, Sequelize);
db.ReceitaCategoria = require('../models/relational/receitaCategoria.js')(sequelize, Sequelize);

// Receita N:N Categoria
// O PDF exige que uma receita possa pertencer a várias categorias.
db.Receita.belongsToMany(db.Categoria, {
    through: db.ReceitaCategoria,
    foreignKey: 'receitaId',
    as: 'Categorias'
});
db.Categoria.belongsToMany(db.Receita, {
    through: db.ReceitaCategoria,
    foreignKey: 'categoriaId',
    as: 'Receitas'
});

// Usuario N:N Habilidade, com nível de 0 a 10 na tabela intermediária.
db.Usuario.belongsToMany(db.Habilidade, {
    through: db.AlunoHabilidade,
    foreignKey: 'usuarioId',
    as: 'Habilidades'
});
db.Habilidade.belongsToMany(db.Usuario, {
    through: db.AlunoHabilidade,
    foreignKey: 'habilidadeId',
    as: 'Alunos'
});

// Receita N:N Usuario, representando os alunos responsáveis pela receita.
db.Receita.belongsToMany(db.Usuario, {
    through: db.ReceitaAluno,
    foreignKey: 'receitaId',
    as: 'Responsaveis'
});
db.Usuario.belongsToMany(db.Receita, {
    through: db.ReceitaAluno,
    foreignKey: 'usuarioId',
    as: 'Receitas'
});

module.exports = db;
