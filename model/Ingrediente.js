const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Cafe = require('./Cafe');

const Ingrediente = sequelize.define('Ingrediente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantidade: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Relação muitos-para-muitos entre Ingrediente e Café
Ingrediente.belongsToMany(Cafe, { through: 'CafeIngrediente' });
Cafe.belongsToMany(Ingrediente, { through: 'CafeIngrediente' });

module.exports = Ingrediente;
