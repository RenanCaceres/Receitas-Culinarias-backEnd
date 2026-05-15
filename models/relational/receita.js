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
        }
    });
    return Receita;
};