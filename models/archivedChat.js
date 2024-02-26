const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const ArchivedChat = sequelize.define("ArchivedChat", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  messages: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  multimedia:{
    type:Sequelize.STRING
  }
});

module.exports = ArchivedChat;
