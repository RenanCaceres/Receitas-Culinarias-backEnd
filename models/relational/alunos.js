module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true
        },

        tipo: {
            type: Sequelize.ENUM('Aluno', 'Externo', 'Admin'), autoIncrement: false
        },

        nome: {
            type: Sequelize.STRING, allowNull: false
        },

        idade: {
            type: Sequelize.INTEGER, allowNull: false
        },

        curso: {
            type: Sequelize.STRING, allowNull: false
        },

        RA: {
            type: Sequelize.INTEGER, allowNull: false
        },

        login: {
            type: Sequelize.STRING, allowNull: false
        },

        senha: {
            type: Sequelize.STRING, allowNull: false
        }
    });
    
    return Usuario;
}