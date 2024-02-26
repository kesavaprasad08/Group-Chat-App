const Chat = require("../models/chat");
const User = require("../models/user");
const UserGroup = require("../models/usergroup");
const { UploadFileT0S3 } = require("../services/awss3");

exports.getChatPage = async (req, res) => {
  try {
    res.sendFile("chat.html", { root: "views" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.getChats = async (req, res) => {
  try {
    const id = req.params.id;
    const chat = await Chat.findAll({ where: { GroupId: id } });
    
    const groupUsers = await UserGroup.findAll({
      attributes: ["UserId"],
      where: { GroupId: id },
    });
    
    
    const ids = groupUsers.map((obj) => 
    obj.dataValues.UserId
  );
    const users = await User.findAll({
      attributes: ["name", "id"],
      where: {
        id: ids,
      },
    });

    res.status(200).json({ chat: chat, groupUsers: users });
  } catch (err) {
console.log(err)
    res.status(500).json({ message: err.message });
  }
};

exports.postChat = async (req, res, next) => {
  try {
    const file =req.file;
    const message=req.user.dataValues.name + ": " + req.body.message;
    const groupId=req.body.groupId;
    console.log('groupId :',groupId, message)
    let fileUrl='';
    if(file){
      const currentDate = new Date();
      const date = currentDate.toISOString().slice(0,10);
      const time= currentDate.toISOString().slice(11,19).replace(/:/g,'');

      const fileName =`${date}_${time}_${file.originalname}`;
      const buffer = file.buffer;
      fileUrl=await UploadFileT0S3(fileName,buffer);
    }
    const newChat =await Chat.create({
      messages: message,
      GroupId:groupId,
      multimedia:fileUrl,
    });
    res.status(200).json({ message: req.body.message, multimedia:newChat.multimedia });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
