const express = require('express')
const app = express()
app.use(express.urlencoded({
    extended: false
}))
const router = express.Router()
const bookController = require('../controllers/book.controllers');
// Retrieve all books
router.get('/', bookController.findAll);

// Create a new book
router.post('/', bookController.create);

// Retrieve a single book with id
router.get('/:_id', bookController.findOne);

// Update a book with id
router.put('/:_id', bookController.update);

// Delete a book with id
router.delete('/:_id', bookController.delete);

module.exports = router