const Sequelize = require('sequelize');

const sequelize = new Sequelize('portfolio_receitas', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ── Modelos ───────────────────────────────────────────────────────────────────
db.Usuario        = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.Receita        = require('../models/relational/receita.js')(sequelize, Sequelize);
db.Categoria      = require('../models/relational/categoria.js')(sequelize, Sequelize);
db.Habilidade     = require('../models/relational/habilidade.js')(sequelize, Sequelize);
db.AlunoHabilidade = require('../models/relational/alunoHabilidade.js')(sequelize, Sequelize);
db.ReceitaAluno   = require('../models/relational/receitaAluno.js')(sequelize, Sequelize);

// ── Associações ───────────────────────────────────────────────────────────────

// Categoria 1:N Receita
db.Categoria.hasMany(db.Receita,   { foreignKey: 'categoriaId', onDelete: 'NO ACTION' });
db.Receita.belongsTo(db.Categoria, { foreignKey: 'categoriaId' });

// Usuario N:N Habilidade  (tabela: alunoHabilidade)
db.Usuario.belongsToMany(db.Habilidade, { through: db.AlunoHabilidade, foreignKey: 'usuarioId' });
db.Habilidade.belongsToMany(db.Usuario, { through: db.AlunoHabilidade, foreignKey: 'habilidadeId' });

// Usuario N:N Receita  (tabela: receitaAluno)
db.Receita.belongsToMany(db.Usuario, { through: db.ReceitaAluno, foreignKey: 'receitaId' });
db.Usuario.belongsToMany(db.Receita, { through: db.ReceitaAluno, foreignKey: 'usuarioId' });

module.exports = db;