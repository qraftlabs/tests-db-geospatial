define(["jquery", 
        "/js/map.js"], function($, map){

  function load () {
    
    var layerStyle = new OpenLayers.StyleMap({'default':{
      strokeColor: "#00FFF0",
      strokeOpacity: 1,
      strokeWidth: 0.7,
      fillColor: "#115500",
      fillOpacity: 0.2,
      label : "${name}",
      fontSize: "10px",
      labelOutlineColor: "white",
      labelOutlineWidth: 2
    }});

    //create the macros layer
    var marosLayer = new OpenLayers.Layer.Vector("Macros", {  
      styleMap: layerStyle
    });

    map.addLayer(marosLayer);

    $.ajax({
      url: "/api/macros",
      cache: false,
      success: function(macros){
        //draw all the macros for this operator
        macros.forEach(function(f){
          marosLayer.drawPostGisGeometry(f.geometry, {name: f.name || ""});
        });
        //**************************************
      }
    });

  }

  return load;
});