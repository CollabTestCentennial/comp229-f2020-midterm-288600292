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

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
