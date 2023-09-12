const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const ShoppingSession = sequelize.define('ShoppingSession', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    total: Sequelize.DECIMAL,
});


module.exports = ShoppingSession;
