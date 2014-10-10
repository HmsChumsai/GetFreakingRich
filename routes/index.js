var express = require('express');
var router = express.Router();
//---For parsing
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res) {
    // res.render('index', { title: 'TEST TEST' });
    res.render('about.html');

});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', {
        title: 'Hello, World!'
    })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username": userName,
        "email": userEmail
    }, function(err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

//Scrapeing segment
router.get('/scrape', function(req, res) {

    url = 'http://marketdata.set.or.th/mkt/sectorquotation.do?sector=SET50&language=th&country=TH';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var title, release, rating;

            var json = [];

            // $('.bodytext').each(function(day) {
            $('table.bodytext tr td[align=left]').each(function(day) {
                var stock = {
                    name: "",
                    date: "",
                    open: "",
                    high: "",
                    low: "",
                    close: ""
                };
                console.log("found");
                console.log($(this).text().trim());
                stock.name=$(this).text().trim();
                // json+=$(this).text().trim().replace(/\s\s+/g, ',');
                json.push(stock);
            });

        }
        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json',  JSON.stringify(json, null, 4), function(err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')
    })
})


/*
$('table .bodytext [width=100%] [border=0]').each(function(day) {
    
        console.log($(this).text());

});
*/


module.exports = router;