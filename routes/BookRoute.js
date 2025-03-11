const express = require('express');
const BookController = require('../controller/BookController');
const router  =express.Router();

router.post('/',BookController.saveBookInDatabase);


module.exports =router;