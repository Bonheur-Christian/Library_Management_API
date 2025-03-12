const express = require('express');
const BookController = require('../controller/BookController');
const router  =express.Router();

router.post('/save-book',BookController.saveBookInDatabase);
router.get('/', BookController.getBooks);
router.get('/book/:id', BookController.getBookById);
router.put('/update-book/:id', BookController.updateBookById)


module.exports =router; 