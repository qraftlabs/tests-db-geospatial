var winston = require('winston'),
    pg      = require("pg"),
    nconf   = require("nconf");

var connectionString =  nconf.get("db");
 
module.exports = function(callback){
  pg.connect(connectionString, function(err, client){
    if (err) {
      winston.error(err.message, err);
      return process.exit();
    }
    callback(client);
  }); 
};