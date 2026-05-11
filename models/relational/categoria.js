module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('categoria', {
        id : {
            type: sequelize.INTERGER,
            autoIncrement: true, allowNull: false, primaryKey: true 
        },

        nome: {
            type: sequelize.STRING, allowNull: false
        }
    });
    return Categoria;
}