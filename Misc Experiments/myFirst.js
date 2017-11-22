let http = require('http'),
    dateModule = require('./date-module.js'),
    url=require('url'),
    fs=require('fs'),
    events=require('events'),
    eventEmitter=new events.EventEmitter();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type':'text/html'});
    res.write("The date is "+dateModule.dateTime()+"<br>");
    res.write(dateModule.dateTimeWithText()+"<br>");

    eventEmitter.on('progressBarDrawn', function (date) {
       res.write("Progress bar drawn at "+date);
    });

    /*---------file system module----------*/
    res.write("<br><br>------File System Module--------"+"<br>");
    fs.readFile('./testing.html', function (err, data) {
        res.write(data);
        eventEmitter.emit('progressBarDrawn', dateModule.dateTime());

    });
    fs.appendFile("newTextFile.txt", "Writing some content", function (err) {
        if(err) throw err;
        res.write("New text file created"+"<br>");
    });
    fs.open("newTextFile2.txt", 'w', function (err, file) {
        if(err) throw err;
        res.write("Opened file"+"<br>");
    });
    fs.writeFile("newTextFile2.txt", "New Text", function (err) {
       if(err) throw err;
       res.write("Content replaced"+"<br>");
    });
    fs.open("fileToBeDeleted.txt", 'w', function (err) {
        if(err) throw err;
        res.write("Created file to delete. :)"+"<br>");
    });
    fs.unlink("fileToBeDeleted.txt", function (err) {
        if(err) throw err;
        res.write("Deleted file"+"<br>");
    });
    // fs.rename("newTextFile.txt", 'newName.txt', function (err) {
    //     if(err) throw err;
    //     res.write("Renamed file");
    // });

    /*-------------url module-------------*/
    let urlModule = function () {
        let currentUrl=url.parse(req.url, true),
            query=currentUrl.query;
        res.write("<br><br>------URL Module--------"+"<br>");
        res.write("req.url is: "+req.url+"<br>");
        res.write("url.parse(req.url) is: "+currentUrl+"<br>");
        res.write("The keys in the query object are: <br>")
        for(let key in query) {
            res.write(key+": "+query[key]+"<br>");
        }
        res.write("The host is "+currentUrl.host+"<br>");
        res.write("The path is "+currentUrl.path+"<br>");
        res.write("The search parameters are "+currentUrl.search+"<br>");
    };
    setTimeout(urlModule, 500);

}).listen(8082);


//delays
//sequencing
//control double content appending