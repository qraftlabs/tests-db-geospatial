define(["jquery"], function($){

  var load = function() {
    var fieldsLayer = new OpenLayers.Layer.Vector("Fields");

    var gsat = new OpenLayers.Layer.Google(
      "Google Satellite",
      {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );
    var coordinatesProjection = new OpenLayers.Projection("EPSG:4326");

    map = new OpenLayers.Map({
      div: "map-container",
      projection: "EPSG:3857",
      layers: [gsat, fieldsLayer]
    });

    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.setCenter(new OpenLayers.LonLat(
                      -7058013.6529284, 
                      -3587715.2414932), 15, false, false);
    

    $.ajax({
      url: "/api/fields",
      cache: false,
      success: function(fields){
        fields.forEach(function(f){
          var points = f.geometry.coordinates[0].map(function(points){
            return new OpenLayers.Geometry.Point(points[0], points[1])
              .transform(coordinatesProjection, map.getProjectionObject());
          });
          map.setCenter(new OpenLayers.LonLat(
                      points[0].x, 
                      points[0].y), 15, false, false);
          var linearRing = new OpenLayers.Geometry.LinearRing(points);
          var geometry = new OpenLayers.Geometry.Polygon([linearRing]);

          fieldsLayer.addFeatures([new OpenLayers.Feature.Vector(geometry)]);
        });
      }
    });

  };

  return {
    routes: { "/fields": load  }
  };
});