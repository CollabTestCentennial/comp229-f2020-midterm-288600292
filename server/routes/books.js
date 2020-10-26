// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Add page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/add', {title: 'Add Book', books: ''})
});

// POST calls the function that adds the entry to mongo
router.post('/add', (req, res, next) => {
  //the main thing here is the reflection of the model
  let newBook = book({
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  })
  //this is the adding of "newBook" varaible
  book.create(newBook, (err, Book) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        // ensures that the new data is rendered
        res.redirect('/books');
    }
});
});

// GET the Book edit 
//changed the route so it would point to the correct file
router.get('/edit/:id', (req, res, next) => {
  //the logic to reference the entry we want
  let id = req.params.id;
  //retreive the data and store in var called "bookToEdit"
  book.findById(id, (err, bookToEdit) => {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        //show the edit view
        res.render('books/edit', {title: 'Edit Book', books: bookToEdit})
    }
});
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id
//create a variable according to model for data from post
  let updatedBook = book({
    "_id": id, //important and immutable
    "Title": req.body.Title,
    "Description": req.body.Description,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });
  //this is the function that makes the alteration
  book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
