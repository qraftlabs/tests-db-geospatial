var winston = require('winston'),
    pg      = require("pg"),
    nconf   = require("nconf"),
    cachedDb;

var connectionString =  nconf.get("db");

module.exports = function(callback){
  if(!cachedDb){
    console.log("connecting db");
    pg.connect(connectionString, function(err, client){
      if(err){
        winston.error(err.message, err);
        return process.exit();
      }
      cachedDb = client;
      callback(client);
    }); 
  }else{
    console.log("using db from cache");
    return callback(cachedDb);
  }
};