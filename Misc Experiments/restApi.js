let express=require('express'),
    app = express();
    fs=require('fs');

app.get('/fetchAllUsers', function (req, res) {
   fs.readFile('./dummy.json', function (err, data) {
       debugger;
       res.write(data);
       res.end();
   })
});

app.post('/addUser', function (req, res) {
    fs.readFile('./dummy.json', function (err, data) {
        data = JSON.parse(data);
        data.user3 = {"name":"Aswathhama"};
        fs.writeFile('./dummy.json', JSON.stringify(data), function (err) {
            if(err) throw err;
        });
        res.end(JSON.stringify(data));
    })
});

app.get('/:id', function (req, res) {
   fs.readFile('./dummy.json', function (err, data) {
       if(err) throw err;
       data=JSON.parse(data);
       let user=data["user"+req.params.id];
       res.end(JSON.stringify(user));
   })
});

app.delete('/deleteUser/:id', function (req, res) {
   fs.readFile('./dummy.json', function (err, data) {
       if(err) throw err;
       data=JSON.parse(data);
       delete data["user"+req.params.id];
       res.end(JSON.stringify(data));
   })
});

let server = app.listen(8080);