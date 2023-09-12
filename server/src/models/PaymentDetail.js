const Sequelize = require("sequelize");

const sequelize = require("../../util/database");
const OrderDetails = require("./OrderDetails");

const PaymentDetail = sequelize.define("PaymentDetail", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: Sequelize.INTEGER,
  },
  provider: {
    type : Sequelize.CHAR,
  },
  status:{
    type : Sequelize.BOOLEAN,
  }
});



module.exports = PaymentDetail;
