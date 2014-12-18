var express = require('express');
var async = require("async");
var router = express.Router();
//Technical Analysis
var talib = require('talib');
console.log("TALib Version: " + talib.version);
var functions = talib.functions;
for (i in functions) {
    console.log(functions[i].name);
}

router.get('/test', function(req, res, next) {
    res.render("index.html");
});



router.get('/', function(req, res, next) {
    console.log("reg.query = " + req.query.stockname);
    var marketData = {};
    var collection = req.collection;
    var stockname = req.query.stockname;
    if (!stockname) {
        stockname = "SET";
    }
    var open = [];
    var high = [];
    var low = [];
    var close = [];
    var volume = [];
    var array = [];
    var stockdata = {};
    var results = [];
    var asyncTask = [];
    //function for factoring asyncTask creation
    function getStockData(collection, stockname) {

        return function(callback) {

            collection.find({
                name: stockname
            }).sort({
                seq: 1
            }).toArray(function(err, items) {
                console.log("getStockData() invoked");
                for (var pos in items) {
                    delete items[pos].seq;
                    delete items[pos].name;
                    delete items[pos]._id;
                    open.push(items[pos].open);
                    high.push(items[pos].high);
                    low.push(items[pos].low);
                    close.push(items[pos].close);
                    volume.push(items[pos].volume);
                    array.push(items[pos]);
                }
                //console.log(JSON.stringify(array));
                marketData = {
                    open: open,
                    high: high,
                    low: low,
                    close: close,
                    volume: volume
                };
                stockdata["stockname"] = stockname;
                stockdata["data"] = array;
                results.push(stockdata);
                //console.log("getStockData() = " + JSON.stringify(stockdata));
                callback();
            });
        }
    };
    asyncTask.push(getStockData(collection, stockname));
    async.series(asyncTask, function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Calculate Indicator value
        console.log(JSON.stringify(marketData));
        talib.execute({
            name: "MACD",
            startIdx: 0,
            endIdx: marketData.close.length - 1,
            inReal: marketData.close,
            optInFastPeriod:12,
            optInSlowPeriod:26,
            optInSignalPeriod:9,
            open: marketData.open,
            high: marketData.high,
            low: marketData.low,
            close: marketData.close
        }, function(result) {

            // Show the result array
            console.log("MACD Function Results:");
            console.log(JSON.stringify(result));

        });
        //End Execute
        res.render('dashboard.ejs', {
            "data": results
        });
        //console.log(stockname);
    });

});



module.exports = router;
