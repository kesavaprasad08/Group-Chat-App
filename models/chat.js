const { Sequelize } = require("sequelize");

const sequelize = require("../util/database");

const Chat = sequelize.define("Chat", {
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

module.exports = Chat;
