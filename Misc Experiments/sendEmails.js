let http=require('http'),
    fs=require('fs'),
    nodemailer = require('nodemailer'),
    formidable=require('formidable'),
    nodemailerSmtpTransport = require('nodemailer-smtp-transport');

http.createServer(function (req,res) {
    if(req.url==='/sendMail') {
        let form=formidable.IncomingForm(), transporter, mailOptions,
            senderId, senderPass, receiverId;

        form.parse(req, function (err,fields,files){
            senderId=fields.senderId;
            senderPass=fields.senderPass;
            receiverId=fields.receiverId;

            transporter = nodemailer.createTransport(nodemailerSmtpTransport({
                service:'Gmail',
                auth: {
                    user: senderId,
                    pass: senderPass
                }
            }));

            mailOptions = {
                to: receiverId,
                subject:'Mail to a Geek the Geek Way!',
                html:'<h2 style="color:darkgreen">Hi Darling,</h2><h3 style="color:green">This mail has been sent by your super clever girlfriend through NodeJS in our favourite color. Huahhaha!</h3>'
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if(err){console.log("The error is: "+err);}
                else {
                    console.log("Email sent "+info.response);
                }
                res.end();
            });
        });
    }else {
        fs.readFile('./mailDashboard.html', function (err, file) {
            res.write(file);
            res.end();
        });
    }
}).listen(8080);


