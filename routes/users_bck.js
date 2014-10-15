var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var collection = req.collection;
    var data = [];
    collection.find({
        name: "ADVANC"
    }).toArray(function(err, items) {
        //data = items;

        console.log("find some items");
        for (var i = 0; i < items.length; i++) {
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
            data.push(EOD);
        }
        
        res.render('test', {"data": data});
    });
  
});

module.exports = router;
