const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Cafe = require('./Cafe');

const Ingrediente = sequelize.define('Ingrediente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});


Ingrediente.belongsToMany(Cafe, { through: 'CafeIngrediente' });
Cafe.belongsToMany(Ingrediente, { through: 'CafeIngrediente' });

module.exports = Ingrediente;
