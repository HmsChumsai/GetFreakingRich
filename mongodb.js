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
        collection = db.collection('stock');
        collection.findOne({}, function(err, items) {
            console.log("befor=" + items.date);
            items.date = Date(items.date);
            console.log("after=" + items.date);
            db.close();
        });
        /*
        collection.find({

        }).toArray(function(err, items) {
            //data = items;

            console.log("find some items");
            console.log(items.length);
            for (var i = 0; i < items.length; i++) {
                items[i].date = Date(items[i].date);
                collection.save(items[i], function(err, result) {
                    callback(err);
                });
            }
            console.log("done");
        })
        */
    }
});