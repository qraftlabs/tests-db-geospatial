var nconf = require("nconf"),
    path = require("path");

nconf
   .use("memory")
   .argv()
   .env()
   .file({ file: path.join(__dirname, "../config.json")})
   .defaults({
      "db": "tcp://solapa4:Passw0rd!@s4db.cloudapp.net:5432/solapa4",
      // "mongodb": JSON.stringify({
      //             "host":     "s4db.cloudapp.net",
      //             "port":     27017,
      //             "name":     "solapa4",
      //             "user":     "solapa4",
      //             "password": "Passw0rd!"
      //           }),
      "mongodb": JSON.stringify({
        "host":     "ds041167.mongolab.com",
        "port":     41167,
        "name":     "s4",
        "user":     "solapa4",
        "password": "Passw0rd!"
      }),
      "logglyKey": "9e41aa5a-9b00-483e-b2d7-01d7e1eac03e"
    });

// tcp://solapa4:Passw0rd!@ds041167.mongolab.com:41167/s4
// "db": "tcp://solapa4:Passw0rd!@s4db.cloudapp.net:5432/solapa4",
