var express = require('express');
var app = express();
//var path = require('path');
var serverIndex = require('serve-index');
var http = require('http');
var port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "moods.html"
}


//connection
app.use("/", function(req,res,next) {
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
})
app.all('/', function(req, res, next) {
  console.log('Root Folder...')
  next();
})
app.use('/', express.static('./Files', options));



http.createServer(app).listen(port);
console.log('running on port:', port);
