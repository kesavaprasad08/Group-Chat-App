const express = require("express");

const router = express.Router();

const userAuthentication = require("../middlewares/auth");

const upload = require("../middlewares/fileUpload");

const chatController = require("../controllers/chat-controller");

router.get("/", chatController.getChatPage);

router.get("/chat/:id", chatController.getChats);

router.post("/chat", userAuthentication.authenticate, upload.single('file'),chatController.postChat);

module.exports = router;
