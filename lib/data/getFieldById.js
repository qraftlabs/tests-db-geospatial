var getDb = require("./");

module.exports = function(id, callback){
  getDb(function(conn){
    conn.query("select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, hectareas, superficie" + 
               " from layerseditables.establecimientos" +
               " where gid = $1", [id] , function(err, result){
      if(err) return callback(err);
      result.rows[0].geometry = JSON.parse(result.rows[0].geometry);
      callback(null, result.rows[0]);
    });
  });
};