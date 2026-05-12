module.exports = (sequelize, Sequelize) => {
    const Receita = sequelize.define('receita', {

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true, allowNull: false, primaryKey: true
        },

        nome: {
            type: Sequelize.STRING, allowNull: false
        },

        descricao: {
            type: Sequelize.STRING, allowNull: false
        },

        ingredientes: {
            type: Sequelize.STRING, allowNull: false
        },

        preparo: {
            type: Sequelize.STRING, allowNull: false
        },

        linkExterno: {
            type: Sequelize.STRING, allowNull: true
        },

        // Mantido apenas para compatibilidade com versões anteriores do projeto.
        // O relacionamento correto exigido no PDF é N:N em receitaCategoria.
        categoriaId: {
            type: Sequelize.INTEGER, allowNull: true
        }
    });

    return Receita;
};