var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var logger = require('morgan'); // for debugging
var request = require('request'); // for web-scraping
var cheerio = require('cheerio'); // for web-scraping


// Initialize Express for debugging & body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}))

// Serve Static Content
app.use('/assets', express.static('public'));
app.use(express.static('.'));

// Express-Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//mongo db 
	mongoose.connect('mongodb://localhost/headlines-today');

	var db = mongoose.connection;

	// Show any Mongoose errors
	db.on('error', function (err) {
		console.log('Mongoose Error: ', err);
	});

	// Once logged in to the db through mongoose, log a success message
	db.once('open', function () {
		console.log('Mongoose connection successful.');
	});

	// Import the Comment and Article models
	var Comment = require('./models/Comment.js');
	var Article = require('./models/Article.js');


	// Import Routes/Controller
	var router = require('./controllers/controller.js');
	app.use('/', router);


	// Launch App
	var port = process.env.PORT || 3000;
	app.listen(port, function () {
		console.log('Running on port: ' + port);
	});