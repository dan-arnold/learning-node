var express = require('express');

var bookRouter = express.Router();

var router = function(nav) {
    var books = [{
        title: 'Enders Shadow',
        genre: 'Sci-Fi',
        author: 'Orson Scott Card',
        read: true
    }, {
        title: 'Shadow of the Giant',
        genre: 'Sci-Fi',
        author: 'Orson Scott Card',
        read: false
    }, {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        genre: 'Fantasy',
        author: 'J.R.R. Tolkien',
        read: false
    }];

    bookRouter.route('/')
        .get(function(req, res) {
            res.render('bookListView', {
                title: 'Books',
                nav: nav,
                books: books
            });
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: books[id]
            });
        });

    return bookRouter;
};

module.exports = router;