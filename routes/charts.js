var express = require('express');
var router = express.Router();



/* GET Stock Chart. */
router.get('/', function(req, res) {
    //if (req.params.id=="google-site-verification") {res.render("googled1927f7027c71455.html")};

    console.log("Path / reg.params=" + JSON.stringify(req.params));
    console.log("Path / reg.body=" + JSON.stringify(req.body));
    console.log("Path / reg.query=" + JSON.stringify(req.query));

    var collection = req.collection;
    var stockname = req.query.stockname;
    if (!stockname) {
        stockname = "SET"
    };
    var data = [];
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

        res.render('charts', {
            "data": data,
            "stockname": stockname
        });

    });

});

router.get('/:id', function(req, res) {
    var collection = req.collection;
    var stockname = req.params.id;
    console.log("Path /:id reg.params=" + JSON.stringify(req.params));
    console.log("Path /:id reg.body=" + JSON.stringify(req.body));
    console.log("Path /:id reg.query=" + JSON.stringify(req.query));
    if (!stockname) {
        stockname = "SET"
    };
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

            data.push(items[i]);
        }


        res.render('charts', {
            "data": data,
            "stockname": stockname
        });

    });

});

module.exports = router;
