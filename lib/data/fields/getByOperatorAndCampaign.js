var getDb = require("../");

module.exports = function(id, campaign, callback){
  getDb(function(conn){
    conn.query("select gid,(ST_AsGeoJSON(the_geom)) as geometry, denominacion as name, hectareas, superficie" + 
                " from layerseditables.establecimientos" +
                " where idoperador = $1 and idcampania = $2", 
                [id, campaign] , function(err, result){
      
      if(err) return callback(err);
      
      var fields = result.rows;

      fields.forEach(function (field) {
        field.geometry = JSON.parse(field.geometry);
      });

      callback(null, fields);
    });
  });
};