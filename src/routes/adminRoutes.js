var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [{
    title: 'Enders Shadow',
    genre: 'Sci-Fi',
    author: 'Orson Scott Card',
    read: true
}, {
    title: 'Enders Game',
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
}, {
    title: 'Life on the Mississippi',
    genre: 'History',
    author: 'Mark Twain',
    read: false
}];

var router = function (nav) {

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });
        });

    return adminRouter;
};

module.exports = router;