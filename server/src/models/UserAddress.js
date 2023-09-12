const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const UserAddress = sequelize.define('UserAddress', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address_line1: Sequelize.STRING,
    address_line2: Sequelize.STRING,
    city: Sequelize.STRING,
    country: Sequelize.STRING,
    telephone: Sequelize.STRING,
});


module.exports = UserAddress;
