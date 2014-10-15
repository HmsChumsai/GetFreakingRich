var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
   var data = [{
       
    }]
    //res.render('about.html');
    res.render('test', {"data":data} );
    //res.render('helloworld', {"val":JSON.stringify(data)} );
    //res.json(data);
});

module.exports = router;
