const express = require("express");

const router = express.Router();

const userAuthentication = require("../middlewares/auth");

const chatController = require("../controllers/chatController");

router.get("/", chatController.getChatPage);

router.get("/chat/:id", chatController.getChats);

router.post("/chat", userAuthentication.authenticate, chatController.postChat);

module.exports = router;
