var express = require('express');
var async = require("async");
var router = express.Router();

/*
router.get('/', function(req, res, next) {
    	var chartData = [{
		date: new Date(2011, 5, 1, 0, 0, 0, 0),
		val: 10
	}, {
		date: new Date(2011, 5, 2, 0, 0, 0, 0),
		val: 11
	}, {
		date: new Date(2011, 5, 3, 0, 0, 0, 0),
		val: 12
	}, {
		date: new Date(2011, 5, 4, 0, 0, 0, 0),
		val: 11
	}, {
		date: new Date(2011, 5, 5, 0, 0, 0, 0),
		val: 10
	}, {
		date: new Date(2011, 5, 6, 0, 0, 0, 0),
		val: 11
	}, {
		date: new Date(2011, 5, 7, 0, 0, 0, 0),
		val: 13
	}, {
		date: new Date(2011, 5, 8, 0, 0, 0, 0),
		val: 14
	}, {
		date: new Date(2011, 5, 9, 0, 0, 0, 0),
		val: 17
	}, {
		date: new Date(2011, 5, 10, 0, 0, 0, 0),
		val: 13
	}];
    res.render("index.ejs",{"chartData":chartData});
});

*/


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
        , function(err) { //This function gets called after the two tasks have called their "task callbacks"
            if (err) return next(err);
            console.log(JSON.stringify(results));
            //res.render('charts', {"data":results});
            console.log(stockname);
            res.render("index.ejs",{"chartData":results});
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


module.exports = router;
