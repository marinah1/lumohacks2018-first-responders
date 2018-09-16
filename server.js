var express = require('express');
var app = express();

/*---------
  CONTROLLERS
-----------*/

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

/*--------
  DATABASE - NOSQL MONGODB WITH USE OF NPM MONGOOSE
----------*/
var mongoose = require('mongoose');
var MUrl = "mongodb://nina:sleep123@ds139929.mlab.com:39929/lumo2018";
mongoose.connect(MUrl, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', function(){
  console.log("ERROR!");
});
db.once('open', function(){
  console.log('connection success');
});


var Schema = mongoose.Schema;
var schema = new Schema({
  mood_id : String,
  questions : Number,
  time : String
});

var User = mongoose.model('user', schema);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

today = mm + '/' + dd + '/' + yyyy;

/*--------
   connection
----------*/
app.use("/", function(req,res,next) {
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
})
app.all('/', function(req, res, next) {
  console.log('Root Folder...')
  next();
})
app.use('/', express.static('./files', options));

app.post('/checked-in', function(req, res, next){
 console.log("worked inside check-in");
 console.log(req);
});

http.createServer(app).listen(port);
console.log('running on port:', port);
