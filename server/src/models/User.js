const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    admin: Sequelize.BOOLEAN,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    telephone: Sequelize.STRING,
    password: Sequelize.STRING,
    username: Sequelize.STRING,
    image: Sequelize.STRING
});


module.exports = User;
