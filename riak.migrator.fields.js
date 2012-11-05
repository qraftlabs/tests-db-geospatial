var http = require('http');
http.globalAgent.maxSockets = 100000;

require("./lib/configurate");

var getPostgresConnection = require("./lib/data");
var riak = require('riak-js').getClient({
  host: "solapa4-riak.cloudapp.net", 
  port: "8098" 
});

getPostgresConnection(function(conn){
  conn.query("select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, hectareas, superficie, idcampania as campaign, idoperador as operator" + 
              " from layerseditables.establecimientos", function(err, result){
    
    if(err) return console.log("error connecting to postgres", err);
    
    var fields = result.rows;

    console.log("transforming geometry to standard json doc");

    fields.forEach(function (field, index) {
      field.geometry = JSON.parse(field.geometry);

      riak.save("fieldsa", field.gid.toString(), field, function(err, r1, r2){
        if(err){
          return console.log("error ", require("util").inspect(err));
        }
        console.log(field.gid.toString());
      });

    });
  });
});