const express =require('express');
const UserController = require('../controller/UserController');
const router =express.Router();

router.post('/saveUser', UserController.saveNewUser);


module.exports =router;

