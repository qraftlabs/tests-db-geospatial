var getDb = require("./");

module.exports = function(id, callback){
  getDb(function(conn){
    conn.query({name: "geoByGid",
                text: "select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, hectareas, superficie" + 
                      " from layerseditables.establecimientos" +
                      " where gid = $1", 
                values: [id] }, function(err, result){
      if(err) return callback(err);
      
      var field = result.rows[0];

      field.geometry = JSON.parse(field.geometry);
      
      callback(null, field);
    });
  });
};