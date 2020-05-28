const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

var server = http.createServer(app);

server.listen(80);

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('node_modules'));

app.use('/static', express.static(__dirname+'/views/images'));

app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/choose', (req, res) => {
    res.statusCode = 302;
    res.setHeader("Location", "http://188.166.39.138/choose/" + req.body.pin);
    res.end();
});

app.get('/choose/:pin', (req, res) => {
    res.render('choose', {data : {pin: req.params.pin}});
});

app.post('/choose/:pin/mobile', (req, res) => {
    res.render('mobile', {data : {pin: req.params.pin}});
});

app.post('/choose/:pin/pc', (req, res) => {
    res.render('pc', {data : {pin: req.params.pin}});
});

app.post('/choose/:pin/pc/play', (req, res) => {
    var pincode = req.params.pin;
    var port = pincode;

    // start time
    var currentTime = new Date() / 1000;
    var startTime = currentTime + 10;

    const { exec } = require('child_process');
    exec('java JavaServer ' + port + " " + startTime, (err, stdout, stderr) => {});

    res.render('pcplay', {data : {startTime: startTime, pin: pincode}});
});

app.post('/choose/:pin/mobile/play', (req, res) => {
    var pincode = req.params.pin;
    var port = pincode;

    var startTime;

    const { exec } = require('child_process');
    exec('java JavaClient ' + port, (err, stdout, stderr) => {
        console.log(stdout);
        startTime = stdout;
        res.render('mobileplay', {data : {startTime: startTime, pin: pincode}});
    });
});

app.get('/pcvideo', (req, res) => {
    const path = 'Prototyper3.mp4';

    fs.stat(path, (err, stat) => {

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }

        const fileSize = stat.size
        const range = req.headers.range

        if (range) {

            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
        
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }   
    });
});

app.get('/mobilevideo', (req, res) => {
    const path = 'Prototyper3.mp4';

    fs.stat(path, (err, stat) => {

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }

        const fileSize = stat.size
        const range = req.headers.range

        if (range) {

            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;

            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });
});



//app.listen(80, () => console.log('Server started on port 80'));
