var Converter = require("csvtojson").core.Converter;
var fs = require("fs");

var csvFileName = "myCSVFile2.csv";
var fileStream = fs.createReadStream(csvFileName);
//new converter instance
var param = {};
var csvConverter = new Converter(param);
var tmp={};
//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed", function(jsonObj) {
    //console.log(jsonObj); //here is your result json object
    //tmp = JSON.stringify(jsonObj);
    console.log("type of jsonObj=" +(typeof jsonObj));
    tmp=jsonObj;
    console.log("DONE");
});
fileStream.pipe(csvConverter);
var outputFilename = 'my.json';

fs.writeFile('helloworld.json', JSON.stringify(jsonObj, null, 4), function(err) {
    console.log(tmp);
    console.log("type of tmp=" +(typeof tmp));
    if (err) return console.log(err);
    console.log('Hello World > helloworld.json');
});
/*
fs.writeFile(outputFilename, tmp, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 
*/

//read from file

