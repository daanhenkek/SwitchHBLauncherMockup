let dnsd = require('dnsd');
let ip = require('ip');
let http = require('http');

let dns = dnsd.createServer((req, res) => {
    console.log("Said no");
    res.end(ip.address());
});

let server = http.createServer((req, res) => {
    res.end('<a href="http://192.168.1.7:8080">Click meh</a>')
});

dns.on('error', (err) => {
    console.log("ERR: ", err);
});

dns.listen(53, '0.0.0.0', () => {
    console.log("Server works");
});

server.listen(80, function () {
    console.log("AYYYYYYYYYY");
});