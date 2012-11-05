// require('nodetime').profile({
//   accountKey: 'f068f9d4d7a614f68945af7fd6e3ce6adc2f7f12', 
//   appName: 'solapa 4'
// });

require("./lib/configurate");
require("./lib/setupLogger");

var express = require("express"),
  fs = require("fs"),
  ejs = require("ejs"),
  routes = require("./lib/routes"),
  winston = require("winston"),
  nconf = require("nconf");

var app = express();
 
app.configure(function(){
  this.set("view engine", "ejs");
  this.set("views", __dirname + "/views");
  this.set('json spaces', 0);
  
  this.use(express.compress());

  this.use(express.logger('dev'));
  this.use(express.bodyParser());
  this.use(express.static(__dirname  + "/public"));
  this.use(express.methodOverride());
});

app.configure("development", function(){
  var ejsAmd = require("ejs-amd");
  this.use("/templates", ejsAmd.middleware({
    views: __dirname + "/views/templates"
  }));
});

//blitz
app.get("/mu-8313f9bf-9c03f615-cce7738e-86c7fd83", function (req, res) {
  res.send("42");
});
//end blitz


routes(app);

var port = process.env.port || 8989;
app.listen(port, function(){
  winston.info("listening in http://localhost:" + port);
});