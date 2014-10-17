var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var date = new Date();
var today=date.getDate();
var month=date.getMonth();
var year=date.getFullYear()
//console.log(date.format("dd MMM yyyy"));

var now=new Intl.DateTimeFormat("en-US").format(date);
console.log(now);

function getFormattedDate(input){
    var pattern=/(.*?)\/(.*?)\/(.*?)$/;
    var result = input.replace(pattern,function(match,p1,p2,p3){
        var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return (p2<10?"0"+p2:p2)+" "+months[(p1-1)]+" "+p3;
    });
    return result;
}

//console.log(getFormattedDate(date));

url = 'http://marketdata.set.or.th/mkt/sectorquotation.do?sector=SET50&language=th&country=TH';
request(url, function(error, response, html) {
    if (!error) {
        var $ = cheerio.load(html);

        var title, release, rating;

        var json = [];

        // $('.bodytext').each(function(day) {
        $('table.bodytext tr td[align=left]').each(function(day) {
            console.log(day);
            if (day > 4) {
                var stock = {
                    name: "",
                    date: "",
                    open: "",
                    high: "",
                    low: "",
                    close: ""
                };
                var current = $(this);
                var name = $(this).text().trim();
                console.log(name);
                var open = $(this).next().next().text().trim();
                console.log(open);
                var high = $(this).next().next().next().text().trim();
                var low = $(this).next().next().next().next().text().trim();
                var close = $(this).next().next().next().next().next().text().trim();

                stock.name = name;
                stock.open = open;
                stock.high = high;
                stock.low = low;
                stock.close = close;

                json.push(stock);

            }
        });

    }
    // To write to the system we will use the built in 'fs' library.
    // In this example we will pass 3 parameters to the writeFile function
    // Parameter 1 :  output.json - this is what the created filename will be called
    // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
    // Parameter 3 :  callback function - a callback function to let us know the status of our function

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {

        console.log('File successfully written! - Check your project directory for the output.json file');

    })

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
})
