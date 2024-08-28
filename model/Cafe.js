const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Ingrediente = require('./Ingrediente');

const Cafe = sequelize.define('Cafes', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});
Ingrediente.belongsToMany(Cafe, { through: 'CafeIngrediente' });
Cafe.belongsToMany(Ingrediente, { through: 'CafeIngrediente' });

module.exports = Cafe;