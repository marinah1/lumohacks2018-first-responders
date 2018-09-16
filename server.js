// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();

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

var assert = require("assert");
var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var url = require("url");

var parseBody = require("./middleware/parseBody");
/**
 * Constants
 */
var DATABASE_URL = "mongodb://nina:sleep123@ds139929.mlab.com:39929/lumo2018";
var PORT = process.env.PORT || 5000;

var initializeServer = function(db) {
  var app = express();
  app.use(parseBody());
	app.use('/', express.static('./files', options));

	app.post('/setup', function(req, res){
	 // console.log("worked inside check-in");
	 // console.log(req);
	 // mood = {};
	 // var moodText = req.jsonBody.mood_id;
	 // var collection = db.collection("moods");
	 // mood["mood_id"] = moodText;
	 // collection.insert(mood, function(err, result) {
  //       console.log("Inserted 1 document into the collection");
  //     });
  //      res.status(200);
  //      res.send("Checkout success!");
  //      return;
  });

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
  .connect(DATABASE_URL)
  .catch(() => {
    console.log(`Unable to connect to database at ${DATABASE_URL}`);
    process.exit(1);
  })
  .then(db => {
    console.log(`Connected successfully to database at ${DATABASE_URL}`);
    initializeServer(db);
  });
