require('nodetime').profile({
  accountKey: 'f068f9d4d7a614f68945af7fd6e3ce6adc2f7f12', 
  appName: 'solapa 4'
});

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
  this.use(express.logger('dev'));
  this.use(express.bodyParser());
  this.use(express.static(__dirname  + "/public"));
});

app.configure("development", function(){
  var ejsAmd = require("ejs-amd");
  this.use("/templates", ejsAmd.middleware({
    views: __dirname + "/views/templates"
  }));
});

//blitz
app.get("/mu-ce0c72d3-1109bfe1-3fe5c3a0-239ff0f2", function (req, res) {
  res.send("42");
});
//end blitz


routes(app);

var port = process.env.port || 8989;
app.listen(port, function(){
  winston.info("listening in http://localhost:" + port);
});