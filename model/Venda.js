const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const User = require('./User');
const Cafe = require('./Cafe');


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


Venda.belongsTo(User, { foreignKey: 'UserId', allowNull: false });
User.hasMany(Venda, { foreignKey: 'UserId' });

Venda.belongsToMany(Cafe, { through: 'VendaCafe' });
Cafe.belongsToMany(Venda, { through: 'VendaCafe' });

module.exports = Venda;
