require('dotenv');
var express = require('express');

var app = express();

var sql = require('mssql');

var sqlConfig = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_HOST,
    database: process.env.MSSQL_DB,

    options: {
        encrypt: true
    }
};

sql.connect(sqlConfig, function(err) {});

sql.on('error', function(err) {
    console.log(err);
});

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/books',
    Text: 'Book'
}, {
    Link: '/authors',
    Text: 'Author'
}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

var bookRouter = require('./src/routes/bookRoutes')(nav);
app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Library Home',
        nav: nav
    });
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});