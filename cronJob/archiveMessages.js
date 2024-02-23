const cron = require('node-cron');
const Chat = require('../models/chat');
const ArchivedChat = require('../models/ArchivedChat');
const {Op}= require('sequelize');

module.exports=()=>{
    cron.schedule('0 0 * * *',async()=>{
        try{
            const oneDayAgo=new Date();
            oneDayAgo.setDate(oneDayAgo.getDate()-1);
            const oldMessages=await Chat.findAll({
                where:{
                    createdAt:{
                        [Op.lt]:oneDayAgo,
                    }
                }
            }) 
            if(oldMessages.length >0){
                await ArchivedChat.bulkCreate(oldMessages.map((msg)=> msg.toJSON()));
                await Chat.destroy({
                    where:{
                        createdAt:{
                            [Op.lt]:oneDayAgo
                        }
                    }
                })
            }
        }
        catch(e){
            console.log('error while Archiving messages'+e)
        }
    })
}
