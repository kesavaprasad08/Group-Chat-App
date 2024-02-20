const express = require('express');

const router = express.Router();

const chatController =require('../controllers/chatController');

router.get('/',chatController.getChatPage);

router.get('/chat',chatController.getChats)

module.exports= router;
