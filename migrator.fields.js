require("./lib/configurate");

var getPostgresConnection = require("./lib/data");
var getMongoConnection = require("./lib/mongo");

getPostgresConnection(function(conn){
  conn.query("select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, hectareas, superficie, idcampania as campaign, idoperador as operator" + 
              " from layerseditables.establecimientos", function(err, result){
    
    if(err) return console.log("error connecting to postgres", err);
    
    var fields = result.rows;

    console.log("transforming geometry to standard json doc");

    fields.forEach(function (field) {
      field.geometry = JSON.parse(field.geometry);
    });

    console.log("inserting " + fields.length + " in mongodb");

    getMongoConnection(function(db){
      db.collection("fields").insert(fields, function(err, inserted){
        console.log("inserted " + inserted.length + " documents in mongodb");
        process.exit();
      });
    });

  });
});