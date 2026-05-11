module.exports = (sequelize, Sequelize) => {
    const AlunoHabilidade = sequelize.define('alunoHabilidade', {
        nivel: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 0, max: 10 }
        }
    });
    return AlunoHabilidade;
};