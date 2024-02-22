const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const UserGroup = sequelize.define("UserGroup", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  GroupName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  IsAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = UserGroup;
