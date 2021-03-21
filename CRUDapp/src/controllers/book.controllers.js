const Book = require('../models/book.model.js');
// Retrieve and return all Books from the database.
exports.findAll = (req, res) => {
Book.find()
  .then(books => {
  res.send(books);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while getting list of books."
});
});
};
// Create and Save a new Book
exports.create = (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Create a new Book
const book = new Book({
  _id: req.body._id,
  name: req.body.name,
  img: req.body.img,
  summary: req.body.summary
});
// Save book in the database
book.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new book."
});
});
};
// Find a single Book with a id
exports.findOne = (req, res) => {
 Book.findById(req.params._id)
  .then(book => {
  if(!book) {
   return res.status(404).send({
   message: "Book not found with id " + req.params._id
 });
}
 res.send(book);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "Book not found with id " + req.params._id
  });
}
return res.status(500).send({
  message: "Error getting book with id " + req.params._id
});
});
};
// Update a Book identified by the id in the request
exports.update = (req, res) => {
// Validate Request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
// Find book and update it with the request body
Book.findByIdAndUpdate(req.params._id, {
  _id: req.body._id,
  name: req.body.name,
  img: req.body.img,
  summary: req.body.summary
}, {new: true})
.then(book => {
 if(!book) {
   return res.status(404).send({
   message: "book not found with id " + req.params._id
 });
}
res.send(book);
}).catch(err => {
if(err.kind === 'ObjectId') {
  return res.status(404).send({
  message: "book not found with id " + req.params._id
});
}
return res.status(500).send({
  message: "Error updating book with id " + req.params._id
});
});
};
// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
Book.findByIdAndRemove(req.params._id)
.then(book => {
if(!book) {
  return res.status(404).send({
  message: "book not found with id " + req.params._id
});
}
res.send({message: "book deleted successfully!"});
}).catch(err => {
if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  return res.status(404).send({
  message: "book not found with id " + req.params._id
});
}
return res.status(500).send({
  message: "Could not delete book with id " + req.params._id
});
});
};