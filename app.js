
const express = require('express'),
	app = express(),
	router = express.Router();

const bodyParser = require('body-parser'),
	path = require('path'),
	ejs = require('ejs'),
	mongoose = require('mongoose'),
	http = require('http'),
	fs = require('fs'),
	moment = require('moment'),
	compression = require('compression'),
	cookieParser = require('cookie-parser'),
	expressValidator = require('express-validator'),
	PORT = process.env.PORT || 8084;

const home = require('./routes/index'),
	users = require('./routes/user');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", ""); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//setting public folder
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//setting middleware for cookieParser
app.use(cookieParser('keyboard cat'));
app.use(compression({
    level: 9,
    memLevel: 9
}));


app.use(function(req, res, next) {
    res.locals.moment = moment;
    next();
});

app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.json());

//setting routes to proper controller file
app.use('/', home);
app.use('/user', users);

//starting server
app.listen(PORT, function() {
    console.log(`Server running at port ${PORT} : http://127.0.0.1:${PORT}`);
});
