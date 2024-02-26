const express = require('express');

const router = express.Router();

const userController = require('../controllers/user-controller')

router.post('/add-user',userController.addUser);

router.get('/login',userController.getLoginPage);

router.post('/login',userController.loginUser);

module.exports= router;
