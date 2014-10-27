var express = require('express');
var async = require("async");
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("index.html");
});

/*

router.get('/', function(req, res, next) {

    var collection = req.collection;
    var stockname = req.query.stockname;
    if (!stockname) {
        stockname = "SET"
    }
    var results = [];
    var asyncTask = []
    asyncTask.push(getStockData(collection, stockname));
    async.series(asyncTask
        /*
        async.series([
            //Load user to get userId first
            function(callback) {
                collection.find({
                    name: stockname
                }).sort({
                    date: 1
                }).toArray(function(err, items) {
                    console.log("getStockData() invoked");
                    for (var pos in items) {
                        results.push(items[pos]);
                    }
                    // console.log("getStockData() = "+JSON.stringify(array));
                    callback();
                });
            }
        
        , function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err);
            console.log(JSON.stringify(results));
            res.render('charts', {"data":results});
            console.log(stockname);
        });
    //function for factoring asyncTask creation
    function getStockData(collection, stockname) {

        return function(callback) {
            var array = [];
            var stockdata={};
            collection.find({
                name: stockname
            }).sort({
                date: 1
            }).toArray(function(err, items) {
                console.log("getStockData() invoked");
                
                for (var pos in items) {
                    delete items[pos].name;
                    delete items[pos]._id;
                    array.push(items[pos])

                }
                stockdata["stockname"]=stockname;
                stockdata["data"]=array;
                results.push(stockdata);
                console.log("getStockData() = " + JSON.stringify(stockdata));
                callback();
            });
        }
    };
});

*/

module.exports = router;
