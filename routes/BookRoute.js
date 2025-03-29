const express = require('express');
const BookController = require('../controller/BookController');
const router = express.Router();

router.post('/save-book', BookController.saveBookInStock);
router.post('/request-book', BookController.lendBook);
router.get('/all-books', BookController.getBooksInStock);
router.get('/book/:id', BookController.getBookByIdFromStock);
router.put('/update-book/:id', BookController.updateBookByIdInStock);
router.delete('/delete-book/:id', BookController.deleteBookById);



module.exports = router; 