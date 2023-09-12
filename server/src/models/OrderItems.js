const Sequelize = require("sequelize");

const sequelize = require("../../util/database");
const Product = require("./Product");

const OrderItems = sequelize.define("OrderItems", {
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


module.exports = OrderItems;