var getDb = require("./");

var cache = {};

module.exports = function(id, callback){
  if (cache[id]) {
    process.nextTick(function() {
      callback(null, cache[id]);
    });
  }else {
    getDb(function(conn){
      conn.query({name: "geoByGid",
                  text: "select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, hectareas, superficie" + 
                        " from layerseditables.establecimientos" +
                        " where gid = $1", 
                  values: [id] }, function(err, result){
        if(err) return callback(err);
        
        var field = result.rows[0];

        field.geometry = JSON.parse(field.geometry);
        cache[id] = field;
        callback(null, field);
      });
    });
  }
};