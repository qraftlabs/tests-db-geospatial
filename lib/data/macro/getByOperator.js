var getDb = require("../");

module.exports = function(id, callback){
  getDb(function(conn){
    conn.query("select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name" + 
                " from layerseditables.macroambientes" +
                " where idoperador = $1",
                [id] , function(err, result){
      
      if(err) return callback(err);
      
      var fields = result.rows;

      fields.forEach(function (field) {
        field.geometry = JSON.parse(field.geometry);
      });

      callback(null, fields);
    });
  });
};