const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const UserPayment = sequelize.define("UserPayment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  payment_type: Sequelize.STRING,
  provider: Sequelize.STRING,
  account_no: Sequelize.INTEGER,
  expiry: Sequelize.DATE,
});

module.exports = UserPayment;
