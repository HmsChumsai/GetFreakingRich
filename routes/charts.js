var express = require('express');
var router = express.Router();



/* GET Stock Chart. */
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



module.exports = router;
