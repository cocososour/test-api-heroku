
require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/productModel'),
  Cart = require('./api/models/cartModel'), //created model loading here
  bodyParser = require('body-parser');

var Mockgoose = require('mockgoose').Mockgoose;
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mock mongoose before requiring the script which establishes the connection (to mock the connection)
var mockgoose = new Mockgoose(mongoose);

if (process.env.NODE_ENV == 'test') {
	mockgoose.prepareStorage().then(function() {
		mongoose.connect(connectionPath);
	});

	var db = mongoose.connection;
	db.once('open', function() {
		console.log("Test db connected");
	});

	db.on('error', function(err) {
		console.log('error', error);
	});

	return db;
} else {
	console.log("actual db loaded");
	mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Shoppingdb'); 
}
// mongoose instance connection url connection
// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Shoppingdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/productRoutes'); //importing route
routes(app); //register the route
var routes_cart = require('./api/routes/cartRoutes'); //importing route
routes_cart(app); //register the route

app.listen(port);


console.log('product RESTful API server started on: ' + port); 
