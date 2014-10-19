var express = require('express');
var async = require("async");
var router = express.Router();



/* GET Stock Chart. */
/*
router.get('/', function(req, res) {

console.log("Path / reg.params=" + JSON.stringify(req.params));
console.log("Path / reg.body=" + JSON.stringify(req.body));
console.log("Path / reg.query=" + JSON.stringify(req.query));

var collection = req.collection;
var stockname = req.query.stockname;
if (!stockname) {
stockname = "SET"
};

var data=[];
var second=[];
var third = [];
collection.find({
name: stockname
}).sort({
date: 1
}).toArray(function(err, items) {

//data = items;


console.log("find some items");
console.log(items.length);
for (var i = 0; i < items.length; i++) {

data.push(items[i]);
}
collection.find({
name: "ADVANC"
}).sort({
date: 1
}).toArray(function(err, items) {

//data = items;
console.log("find some items");
console.log(items.length);
for (var i = 0; i < items.length; i++) {

second.push(items[i]);
}
collection.find({
name: "AOT"
}).sort({
date: 1
}).toArray(function(err, items) {

//data = items;
console.log("find some items");
console.log(items.length);
for (var i = 0; i < items.length; i++) {

third.push(items[i]);
}
console.log(JSON.stringify(third));
res.render('charts', {
"data": data,
"stockname": stockname,
"second":second,
"third":third
});
});

});

});

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
        */
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

module.exports = router;
