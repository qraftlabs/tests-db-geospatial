define(["jquery"], function ($) {

  var coordinatesProjection = new OpenLayers.Projection("EPSG:4326");


  OpenLayers.Layer.prototype.drawPostGisPolygon = function (polygon, attribs) {
    var points = polygon.map(function(points){
      return new OpenLayers.Geometry.Point(points[0], points[1])
        .transform(coordinatesProjection, map.getProjectionObject());
    });
    map.setCenter(new OpenLayers.LonLat(
                points[0].x, 
                points[0].y), 15, false, false);
    var linearRing = new OpenLayers.Geometry.LinearRing(points);
    var geometry = new OpenLayers.Geometry.Polygon([linearRing]);
    var feature = new OpenLayers.Feature.Vector(geometry);
    feature.attributes = attribs;
    
    this.addFeatures([feature]);
  };

  OpenLayers.Layer.prototype.drawPostGisGeometry = function (geometry, attribs) {
    var self = this;
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates[0].forEach(function (polygon) {
        self.drawPostGisPolygon(polygon, attribs);
      });
    } else if (geometry.type === "Polygon") {
      self.drawPostGisPolygon(geometry.coordinates[0], attribs);
    }
  };

  var gsat = new OpenLayers.Layer.Google(
      "Google Satellite",
      {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );

  var map = new OpenLayers.Map({
    div: "map-container",
    projection: "EPSG:3857",
    layers: [gsat]
  });

  map.addControl(new OpenLayers.Control.LayerSwitcher());

  return map;
});