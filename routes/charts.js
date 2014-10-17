var express = require('express');
var router = express.Router();

/* GET Stock Chart. */
router.get('/', function(req, res) {
    console.log("Path / reg.params="+JSON.stringify(req.params));
    console.log("Path / reg.body="+JSON.stringify(req.body));
    console.log("Path / reg.query="+JSON.stringify(req.query));

    var collection = req.collection;
    var stockname=req.query.stockname;
    if (!stockname) {stockname="SET"};
    var data = [];
    collection.find({
        name: stockname
    }).sort({
        _id: 1
    }).toArray(function(err, items) {
        //data = items;

        console.log("find some items");
        console.log(items.length);
        for (var i = 0; i < items.length; i++) {
            //for (var i = 0; i < 20; i++) {
            var EOD = {
                date: "",
                open: "",
                high: "",
                low: "",
                close: ""
            };

            EOD.date = items[i].date;
            EOD.open = "" + items[i].open;
            EOD.high = "" + items[i].high;
            EOD.low = "" + items[i].low;
            EOD.close = "" + items[i].close;
            //console.log(JSON.stringify(EOD));
            data[i] = EOD;

        }

        res.render('charts', {
            "data": data
        });

    });

});

router.get('/:id', function(req, res) {
    var collection = req.collection;
    var stockname=req.params.id;
    console.log("Path /:id reg.params="+JSON.stringify(req.params));
    console.log("Path /:id reg.body="+JSON.stringify(req.body));
    console.log("Path /:id reg.query="+JSON.stringify(req.query));
    if (!stockname) {stockname="SET"};
    var data = [];
    collection.find({
        name: stockname
    }).sort({
        _id: 1
    }).toArray(function(err, items) {
        //data = items;

        console.log("find some items");
        console.log(items.length);
        for (var i = 0; i < items.length; i++) {
            //for (var i = 0; i < 20; i++) {
            var EOD = {
                date: "",
                open: "",
                high: "",
                low: "",
                close: "",
                volume:""
            };

            EOD.date = items[i].date;
            EOD.open = "" + items[i].open;
            EOD.high = "" + items[i].high;
            EOD.low = "" + items[i].low;
            EOD.close = "" + items[i].close;
            EOD.volumn="" + items[i].volumn
            //console.log(JSON.stringify(EOD));
            data[i] = EOD;

        }

        res.render('charts', {
            "data": data,
            "stockname":stockname
        });

    });

});

module.exports = router;
