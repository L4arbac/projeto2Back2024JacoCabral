const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

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

module.exports = Cafe;