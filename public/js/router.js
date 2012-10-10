define(["jquery",
        "director"
        ], function($, director){

  var swapPages = function(route, data){
      var p;
      $("section")
          .each(function(){
              var currentSection = $(this);
              if(currentSection.attr("data-route") == route ||
                  (!!currentSection.attr("data-route-regex") &&
                      route.match(new RegExp(currentSection.attr("data-route-regex"))))){
                  p = currentSection;
                  return false;
              }
          });

      if (!p) {
        throw "unable to find content pane for this route";
      }
      document.title = p.data('title');
      $('#sidebar li').removeClass('active').find('a[href="#' + route + '"]').parent().addClass('active');
      $('#userbar li').removeClass('active').find('a[href="#' + route + '"]').parent().addClass('active');
      $("section.current").removeClass("current");
      p.addClass("current");
  };

  var init = function init(controllers) {
    var routes = {};
    $.each(controllers, function(i, controller){
      $.extend(routes, controller.routes);
    });
    var rtr = new director.Router();
    rtr.mount(routes);
    rtr.configure({
      on: function(x){
        swapPages(window.location.hash.substr(1));
      }
    });
    rtr.init();

    if(!window.location.hash){
      window.location.hash = "#/";
    }
  };

  return {
    init: init
  };
});