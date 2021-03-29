const Logger = require('g:/CredenceAnalytics/NodeJS_Assignment/CRUDapp/services/logger_service.js')
const express = require('express')
const app = express()
const Book = require('../models/book.model.js');
const logger = new Logger('app')
app.use(express.urlencoded({
  extended: false
}))



// Retrieve and return all Books from the database.
exports.findAll = async (req, res) => {
  try {
    logger.info("REQUEST: GET request for all IDs - " + process.env.EndpointURL + '/')
    const books = await Book.find()
    res.json(books)
    logger.info("RESPONSE: Returning all the records { ID : " + books.params._id + " | Name : " + books.name + " | Image : " + books.img + " | Summary : " + books.summary +" }")
  } catch (err) {
    res.status(500).send("RESPONSE : Something went wrong while getting list of books." || err.message)
    logger.error("RESPONSE : Something went wrong while getting list of books." || err.message)
  }
};


// Create and Save a new Book
exports.create = async (req, res) => {
  try {
  logger.info("REQUEST: POST request for ID : " + req.body._id + " - " + process.env.EndpointURL + '/')

  // Validate request
  if (!req.body) {
    return res.status(400).send(logger.error("Please fill all required field"));
  }
  // Create a new Book
  const book = new Book({
    _id: req.body._id,
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary
  });
  
    // Save book in the database
    const newBook = await book.save();
    res.status(201).json({ newBook });
    logger.info("RESPONSE: Posted record with ID : " + book._id + " | Name : " + book.name + " | Image : " + book.img + " | Summary : " + book.summary)
  } catch (err) {
    res.status(400).send("RESPONSE : Book already present with the same ID");
    logger.error("RESPONSE : Book already present with the same ID")
  }};


// Find a single Book with a id
exports.findOne = async (req, res) => {
  try {
  logger.info("REQUEST : GET Request recieved for ID : " + req.params._id + " - " + process.env.EndpointURL + '/' + req.body._id)
  
    const book = await Book.findById(req.params._id);

    if (!book) {
      return res.status(404).send(logger.error("RESPONSE : Book not found with id : " + req.params._id));
    }
    res.json(book)
    logger.info("RESPONSE : Found Book with id : " + req.params._id +" - " +book);
  }
  catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send(logger.error("RESPONSE : Book not found with id : " + req.params._id + "  -- Message: " + err.message));
    }
    return res.status(500).send(
      logger.error("Error getting book with id " + req.params._id + "  -- Message: " + err.message))

  }

}


// Update a Book identified by the id in the request
exports.update = async (req, res) => {

  try{
    logger.info("REQUEST : PUT request for ID : " + req.params._id + " - " + process.env.EndpointURL + '/' + req.params._id);
    // Validate Request
    if (!req.body) {
      return res.status(400).send(logger.error("Please fill all required field"));
    }
    // Find book and update it with the request body
    let book = await Book.findByIdAndUpdate(req.params._id, {
      _id: req.body._id,
      name: req.body.name,
      img: req.body.img,
      summary: req.body.summary
    }, { new: true })
    
        if (!book) {
          return res.status(404).send(logger.error("RESPONSE : Book not found with id : " + req.params._id));
        }
        res.send(book);
        logger.info("RESPONSE : Record updated with ID : " + req.params._id + " | Updated Values - ID : " + book._id + " | Name : " + book.name + " | Image : " + book.img + " | Summary : " + book.summary);
      }
    catch(err) {
        if (err.kind === 'ObjectId') {
          return res.status(404).send(logger.error("RESPONSE : Book not found with id : " + req.params._id));
        }
        return res.status(500).send(logger.error("Error updating book with id " + req.params._id));
      }  };

// Delete a Book with the specified id in the request
exports.delete = async (req, res) => {
  try{
  logger.info("REQUEST : DELETE request for ID : " + req.params._id + " - " + process.env.EndpointURL + '/' + req.params._id);
  let book = await Book.findByIdAndRemove(req.params._id)
    
      if (!book) {
        return res.status(404).send(logger.error("RESPONSE : Book not found with id : " + req.params._id));
      }
      res.send(logger.info("RESPONSE : Book Deleted successfully with ID : " + req.params._id));
    }
	catch(err){
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send(logger.error("RESPONSE : Book not found with id : " + req.params._id));
      }
      return res.status(500).send(logger.error("Could not delete book with id " + req.params._id));
    }};
