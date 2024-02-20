const Chat = require("../models/chat");

exports.getChatPage = async (req, res) => {
  try {
    res.sendFile("chat.html", { root: "views" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.getChats = async (req, res) => {
  try {
    const chat = await Chat.findAll();
    res.status(200).json({ chat: chat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postChat = async (req, res, next) => {
  try {
    await Chat.create({
      Messages: req.user.dataValues.Name + ": " + req.body.message,
    });
    res.status(200).json({ message: req.body.message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
