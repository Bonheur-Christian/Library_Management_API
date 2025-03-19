const express = require('express');
const BookController = require('../controller/BookController');
const router  =express.Router();

router.post('/save-book',BookController.saveBookInDatabase);
router.post('/request-book', BookController.lendBook);
router.get('/all-books', BookController.getBooks);
router.get('/book/:id', BookController.getBookById);
router.put('/update-book/:id', BookController.updateBookById);
router.delete('/delete-book/:id', BookController.deleteBookById);



module.exports =router; 