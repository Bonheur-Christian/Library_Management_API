const express = require('express');
const NovelController = require('../controller/NovelController');
const router = express.Router();

router.post('/save-book', NovelController.saveBookInStock);
router.post('/request-book', NovelController.lendBook);
router.get('/all-books', NovelController.getBooksInStock);
router.get('/book/:id', NovelController.getBookByIdFromStock);
router.put('/update-book/:id', NovelController.updateBookByIdInStock);
router.delete('/delete-book/:id', NovelController.deleteBookById);



module.exports = router; 