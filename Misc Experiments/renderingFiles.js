let http = require('http'),
    url = require('url'),
    fs = require('fs');

http.createServer(function (req, res) {
    let currentUrl = url.parse(req.url, true),
       filename = "."+(currentUrl.pathname==="/" ? "/colorPanel.html" : currentUrl.pathname);

    url.resolve('http://localhost:8081','/green.html');

   // fs.readFile(filename, function (err, data) {
   //     if(err) {
   //         res.writeHead(404, {'Content-type': 'text/html'});
   //         return res.end("File not found");
   //     }
   //     res.writeHead(200, {'Content-type': 'text/html'});
   //     return res.end(data);
   // });
}).listen(8081);