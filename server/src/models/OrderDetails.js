const Sequelize = require("sequelize");

const sequelize = require("../../util/database");
const OrderItems = require("./OrderItems");

const OrderDetails = sequelize.define("OrderDetails", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total:{
    type: Sequelize.DECIMAL,
    allowNull: true,
  },
});



module.exports = OrderDetails;