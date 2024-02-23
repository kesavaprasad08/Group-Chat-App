const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const ArchivedChat = sequelize.define("ArchivedChat", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  Messages: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Multimedia:{
    type:Sequelize.STRING
  }
});

module.exports = ArchivedChat;
