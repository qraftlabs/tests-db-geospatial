var winston = require("winston"),
    nconf = require("nconf");

// if((process.env.NODE_ENV || "development") === "development") {
  winston.setLevels(winston.config.syslog.levels);
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, { colorize: true, level: "debug" });
// }else{
//   console.log("using loggly");
//   require('winston-loggly');
//   winston.add(winston.transports.Loggly, { 
//     subdomain: "auth10", 
//     inputToken: nconf.get("logglyKey"), 
//     json: true 
//   });
// }