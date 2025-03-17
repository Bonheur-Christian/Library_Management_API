const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.post('/saveUser', UserController.saveNewUser);
router.get('/user/:id', UserController.getUserByID);
router.get('/users', UserController.getAllUsersFromDB);
router.put('/update-user/:id', UserController.updateUserByID);
router.delete('/delete-user/:id', UserController.deleteUserFromDB);

module.exports = router;

