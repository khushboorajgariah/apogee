let http=require('http')
    formidable=require('formidable'),
    fs=require('fs');

http.createServer(function (req, res) {
    if(req.url === '/uploadFile') {
        let form = formidable.IncomingForm();
        form.parse(req, function (err, fields, files ) {
            let oldPath = files.fileToUpload.path,
                newPath = './'+files.fileToUpload.name;
            fs.rename(oldPath, newPath, function (err) {
                if(err) throw err;
                fs.readFile(newPath, function (err, file) {
                    if(err) throw err;
                    res.writeHead(200, {'Content-type': 'text/html'});
                    res.write(file);
                    res.end();
                });
            });
        })
    }else {
        fs.readFile('./simpleForm.html', function (err, data) {
            res.write(data);
        });
    }
}).listen(8084);