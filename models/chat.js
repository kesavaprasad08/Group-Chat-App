const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Chat = sequelize.define('Chat',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
   Messages:{
    type:Sequelize.STRING,
    allowNull:false,
   }

})

module.exports=Chat;