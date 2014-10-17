var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
//---For parsing

// New Code
/*
var mongo = require('mongoskin');
var monk = require('monk');
//var db = monk('localhost:27017/nodetest1');
var db = mongo.db(process.env.MONGOLAB_URI, {native_parser:true});
*/
//Set Up MongoDb
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    
var url = 'mongodb://test:1234@ds035250.mongolab.com:35250/gfrdata';
var mongoDbObj;
var collection;
MongoClient.connect(url, function(err, db) {
    if (err)
        console.log(err);
    else {
        console.log("Connected to MongoDB");
        mongoDbObj = {
            db: db,
            stocks: db.collection('stock')
        };
    }
    collection = db.collection('stock');

});


var routes = require('./routes/index');
var charts = require('./routes/charts');
//var ip = require("ip");
//console.dir ( ip.address() );

// view engine setup
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(require('prerender-node').set('prerenderToken', 'YOUR_TOKEN'));
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Make our db accessible to our router
app.use(function(req, res, next) {
    //req.db = db;
    req.collection = collection;
    next();
});

//app.use('/', routes);
//app.use('/users', users);
app.use('/googled1927f7027c71455.html', function (req, res, next) {
    console.log("googled")
    res.render("google.html");
});
app.use('/', charts);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


console.log('Magic happens on port 8081');
module.exports = app;
