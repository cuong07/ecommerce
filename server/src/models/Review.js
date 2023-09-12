const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const Review = sequelize.define("Reviews", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: Sequelize.TEXT,
  },
});

module.exports = Review;