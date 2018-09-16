// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();


/*---------
  CONTROLLERS
-----------*/

// if(dd<10) {
//     dd = '0'+dd
// }


// if(mm<10) {
//     mm = '0'+mm
// }

// today = mm + '/' + dd + '/' + yyyy;

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: "moods.html"
}


// /*--------
//   DATABASE - NOSQL MONGODB WITH USE OF NPM MONGOOSE
// ----------*/
// var mongoose = require('mongoose');
// var MUrl = "mongodb://nina:sleep123@ds139929.mlab.com:39929/lumo2018";
// mongoose.connect(MUrl, {useNewUrlParser: true});
// var db = mongoose.connection;
// db.on('error', function(){
//   console.log("ERROR!");
// });
// db.once('open', function(){
//   console.log('connection success');
// });
//
//
// var Schema = mongoose.Schema;
// var schema = new Schema({
//   mood_id : String,
//   questions : Number,
//   time : String
// });
//
// var User = mongoose.model('user', schema);
//
// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();
//
// if(dd<10) {
//     dd = '0'+dd
// }
//
// if(mm<10) {
//     mm = '0'+mm
// }
//
// today = mm + '/' + dd + '/' + yyyy;
//
// /*--------
//    connection
// ----------*/
// app.use("/", function(req,res,next) {
//   console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
//   next();
// })
// app.all('/', function(req, res, next) {
//   console.log('Root Folder...')
//   next();
// })
// app.use('/', express.static('./files', options));
//
// app.post('/checked-in', function(req, res, next){
//  console.log("worked inside check-in");
//  console.log(req);
// });
//
// http.createServer(app).listen(port);
// console.log('running on port:', port);

var assert = require("assert");
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var url = require("url");

var parseBody = require("./middleware/parseBody");
/**
 * Constants
 */
var DATABASE_URL = "mongodb://nina:sleep123@ds139929.mlab.com:39929/lumo2018";
var PORT = process.env.PORT || 8080;

var initializeServer = function(db) {
  var app = express();
  app.use(parseBody());
app.use('/', express.static('./files', options));


  app.post('/check', function(req, res){
	 console.log("worked inside check-in");
	 console.log(req);
	 mood = {};
	 var moodText = req.jsonBody.mood_id;
	 var collection = db.collection("moods");
	 mood["mood_id"] = moodText;
	 collection.insert(mood, function(err, result) {
        console.log("Inserted 1 document into the collection");
      });
       res.status(200);
       res.send("Checkout success!");
       return;
  });

  app.listen(PORT, function() {
    console.log(`Server is running at localhost:${PORT}`);
  });
};

mongoClient
  .connect(DATABASE_URL,  { useNewUrlParser: true } )
  .catch(() => {
    console.log(`Unable to connect to database at ${DATABASE_URL}`);
    process.exit(1);
  })
  .then(db => {
    console.log(`Connected successfully to database at ${DATABASE_URL}`);
    initializeServer(db);
  });
