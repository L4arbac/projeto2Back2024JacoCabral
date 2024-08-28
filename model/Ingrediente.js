const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');


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




module.exports = Ingrediente;
