var nconf = require("nconf"),
    path = require("path");

nconf
   .use("memory")
   .argv()
   .env()
   .file({ file: path.join(__dirname, "../config.json")})
   .defaults({
      "db" : '{"name":"auth11","host":"localhost","port":27017}',
      "logglyKey": "9e41aa5a-9b00-483e-b2d7-01d7e1eac03e"
    });