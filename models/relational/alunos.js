module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
        },

        nome: {
            type: Sequelize.STRING, allowNull: false
        },

        curso: {
            type: Sequelize.STRING, allowNull: false
        },

        RA: {
            type: Sequelize.INTEGER, allowNull: false
        }
    });
    
    return Usuario;
}