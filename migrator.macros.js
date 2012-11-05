require("./lib/configurate");

var getPostgresConnection = require("./lib/data");
var getMongoConnection = require("./lib/mongo");

getPostgresConnection(function(conn){
  conn.query("select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, idoperador as operator" + 
              " from layerseditables.macroambientes limit 20000 offset 10000", function (err, result){
    
    if(err) return console.log("error connecting to postgres", err);
    
    var macros = result.rows;

    console.log("transforming geometry to standard json doc");

    macros.forEach(function (macro) {
      macro.geometry = JSON.parse(macro.geometry);
    });

    console.log("inserting " + macros.length + " in mongodb");

    getMongoConnection(function(db){
      db.collection("macros").insert(macros, function(err, inserted){
        console.log("inserted " + inserted.length + " documents in mongodb");
      });
    });

  });
});