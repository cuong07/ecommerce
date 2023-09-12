const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const Rating = sequelize.define("Ratings", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  rating: {
    type: Sequelize.FLOAT,
    default: 0,
  },
  total_review: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Rating;
