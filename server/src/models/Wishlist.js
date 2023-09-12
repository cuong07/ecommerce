const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Wishlist = sequelize.define("Wishlist", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  list: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = Wishlist;
