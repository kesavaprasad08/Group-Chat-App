const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const Group = sequelize.define("Group", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Group;
