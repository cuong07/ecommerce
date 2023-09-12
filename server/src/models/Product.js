const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Product = sequelize.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  SKU:{
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  image:{
    type: Sequelize.STRING(1234),
  }
});

module.exports = Product;