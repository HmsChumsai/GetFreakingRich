var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
//var url = 'mongodb://localhost:27017/myproject';
var url = 'mongodb://ds035250.mongolab.com:35250/gfrdata';
// Use connect method to connect to the Server
var mongoDbObj;
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
    mongoDbObj.stocks.find({name:"ADVANC"}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    //console.log("Found the following records");
    //console.log(JSON.stringify(docs,4,null));
    
    //callback(docs);
  });     
});