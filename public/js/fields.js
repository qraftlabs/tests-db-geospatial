define([], function(){
  var load = function() {
    var gsat = new OpenLayers.Layer.Google(
      "Google Satellite",
      {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    ), map = new OpenLayers.Map({
      div: "map-container",
      projection: "EPSG:3857",
      layers: [gsat]
    });
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.setCenter(null, 1, false, false);
  };

  return {
    routes: { "/fields": load  }
  };
});