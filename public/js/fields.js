define(["jquery", 
        "/js/map.js"], function($, map){

  function load () {
    
    var layerStyle = new OpenLayers.StyleMap({'default':{
      strokeColor: "#00FFF0",
      strokeOpacity: 1,
      strokeWidth: 0.7,
      fillColor: "#FF5500",
      fillOpacity: 0.4,
      label : "${name}",
      fontSize: "12px",
      labelOutlineColor: "white",
      labelOutlineWidth: 2
    }});

    //create the fields layer
    var fieldsLayer = new OpenLayers.Layer.Vector("Fields", {  
      styleMap: layerStyle
    });

    map.addLayer(fieldsLayer);

    $.ajax({
      url: "/api/fields",
      cache: false,
      success: function(fields){
        //draw all the fields for this operator
        fields.forEach(function(f){
          fieldsLayer.drawPostGisGeometry(f.geometry, {name: f.name}, true);
        });
        //**************************************
      }
    });

  }

  return load;
});