var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
//var url = 'mongodb://localhost:27017/myproject';
var url = 'mongodb://test:1234@ds035250.mongolab.com:35250/gfrdata';
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
    var collection = db.collection('stock');
    db.stats(function(err, stats) {
       //assert.equal(null, err);
        //assert.ok(stats != null);
        //console.log(stats);
       // db.close();
    })
    collection.count(function(err, count) {
        console.log("There are " + count + " records.");
    });
    
    collection.find({}).toArray(function(err, items) {
        //assert.equal(null, err);
        //assert.equal(0, items.length);
        console.log("find some items");
        console.log(JSON.stringify(items));
       //db.close();
    });
    
    /*
    mongoDbObj.stocks.find({
        "name": "ADVANC"
    }).toArray(function(err, docs) {
        //assert.equal(err, null);
        //assert.equal(2, docs.length);
        console.log("Found the following records");
        console.log(JSON.stringify(docs));

        //callback(docs);
        
    });
    */
});