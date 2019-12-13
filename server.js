
require('dotenv').config();

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Product = require('./api/models/productModel'),
  Cart = require('./api/models/cartModel'), //created model loading here
  bodyParser = require('body-parser');


mongoose.Promise = global.Promise;

console.log("actual db loaded");
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Shoppingdb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/productRoutes'); //importing route
routes(app); //register the route
var routes_cart = require('./api/routes/cartRoutes'); //importing route
routes_cart(app); //register the route

app.listen(port);


console.log('product RESTful API server started on: ' + port); 
module.exports = app;
