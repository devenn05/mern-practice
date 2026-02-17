const express = require('express');
const router = express.Router();
const fs = require('fs');
const bookController = require('../controllers/bookController')



router.get('/', bookController.getBooks);

router.post('/add-book', bookController.addBook);

router.post('/delete-all', bookController.deleteAllBook);

router.delete('/delete-book/:index', bookController.deleteBook);

router.get('/:index', bookController.getBookById);

module.exports = router;