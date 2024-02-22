const Chat = require("../models/chat");
const User = require("../models/user");
const UserGroup = require("../models/usergroup");

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
    const ids = groupUsers.map((obj) => obj.UserId);
    const users = await User.findAll({
      attributes: ["Name", "id"],
      where: {
        id: ids,
      },
    });

    res.status(200).json({ chat: chat, groupUsers: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postChat = async (req, res, next) => {
  try {
    await Chat.create({
      Messages: req.user.dataValues.Name + ": " + req.body.message,
      GroupId: req.body.cur,
    });
    res.status(200).json({ message: req.body.message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
