var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser')

var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

// Connection URL
//var url = 'mongodb://localhost:27017/myproject';
//var url = 'mongodb://ds035250.mongolab.com:35250/gfrdata';
// Use connect method to connect to the Server
//var mongoDbObj;

var app = express();
app.set('view engine', 'jade');
app.use(bodyParser());

//var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true})
var db = mongoskin.db('mongodb://test:1234@ds035250.mongolab.com:35250/gfrdata')


app.param('collectionName', function(req, res, next, collectionName) {
  req.collection = db.collection(collectionName);
  console.log(collectionName);
  return next();
})

app.get('/', function(req, res, next) {
  /*
    console.log("Passed!");
  res.send('please select a collection, e.g., /collections/messages')
  */
  req.collection.find({})
})

app.get('/collections/:collectionName', function(req, res, next) {
  req.collection.find({}).toArray(function(e, results) {
    if (e) return next(e)
    console.log(typeof results);
    console.log(results.length);
    res.send(results);
  })
})

app.post('/collections/:collectionName', function(req, res, next) {
  req.collection.insert(req.body, {}, function(e, results) {
    if (e) return next(e)
    res.send(results)
  })
})

//app.get('/collections/:collectionName/:id', function(req, res, next) {
app.get('/collections/:collectionName/:name', function(req, res, next) {
  req.collection.findById(req.params.name, function(e, result) {
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.updateById(req.params.id, {
    $set: req.body
  }, {
    safe: true,
    multi: false
  }, function(e, result) {
    if (e) return next(e)
    res.send((result === 1) ? {
      msg: 'success'
    } : {
      msg: 'error'
    })
  })
})

app.delete('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.removeById(req.params.id, function(e, result) {
    if (e) return next(e)
    res.send((result === 1) ? {
      msg: 'success'
    } : {
      msg: 'error'
    })
  })
})

app.listen(process.env.PORT);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('Magic happens on port ' + process.env.PORT);
module.exports = app;
