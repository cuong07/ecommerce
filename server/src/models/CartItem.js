const Sequelize = require("sequelize");

const sequelize = require("../../util/database");
const Product = require("./Product");
const ShoppingSession = require("./ShoppingSession");

const CartItem = sequelize.define("CartItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = CartItem;