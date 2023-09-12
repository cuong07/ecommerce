const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Discount = sequelize.define("Discount", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  discount_percent:{
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});



module.exports = Discount;