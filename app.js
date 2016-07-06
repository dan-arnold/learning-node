var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

var books = [
    {
        title: 'Enders Shadow',
        genre: 'Sci-Fi',
        author: 'Orson Scott Card',
        read: true
    },
    {
        title: 'Shadow of the Giant',
        genre: 'Sci-Fi',
        author: 'Orson Scott Card',
        read: false
    },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        genre: 'Fantasy',
        author: 'J.R.R. Tolkien',
        read: false
    }];

bookRouter.route('/')
    .get(function(req, res) {
        res.render('books', {
            title: 'Books',
            nav: [{
                Link: '/books',
                Text: 'Books'
            }, {
                Link: '/authors',
                Text: 'Authors'
            }],
            books: books
        });
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Book');
    });

app.use('/books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Library Home',
        nav: [{
            Link: '/books',
            Text: 'Books'
        }, {
            Link: '/authors',
            Text: 'Authors'
        }]
    });
});

app.get('/books', function(req, res) {
    res.send('Hello Books');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});