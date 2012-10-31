define([
    "/js/fields.js",
    "/js/macros.js"
  ], function (loadFields, loadMacros) {
    return {
      routes: { 
        "/layers": function(){
          loadFields();
          loadMacros();
        }
      }
    };

});