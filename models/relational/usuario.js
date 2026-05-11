// models/relational/usuario.js
module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        },
        // tipo: 1 = admin, 2 = aluno
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 2
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Usuario;
};
