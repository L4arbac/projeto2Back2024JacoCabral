const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./User');
const Cafe = require('./Cafe');

// Define o modelo Venda
const Venda = sequelize.define('Venda', {
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

// Relação um-para-muitos entre Venda e User
Venda.belongsTo(User, { foreignKey: 'UserId', allowNull: false });
User.hasMany(Venda, { foreignKey: 'UserId' });

// Relação muitos-para-muitos entre Venda e Cafe
Venda.belongsToMany(Cafe, { through: 'VendaCafe' });
Cafe.belongsToMany(Venda, { through: 'VendaCafe' });

module.exports = Venda;
