var getFieldById = require("../data/getFieldById");

module.exports = function(app){
  
  app.get("/", function(req, res){
    res.render("index");
  });

  app.get("/api/fields", function (req, res) {
    getFieldById(20149, function(err, result){
      res.json([result]);
    });
    // res.json([{
    //   points: [
    //     {lon: -7058013.6529284, lat: -3587715.2414932},
    //     {lon: -7058013.6529284, lat: -3588670.7043466},
    //     {lon: -7057058.190075, lat: -3588670.7043466},
    //     {lon: -7057479.190075, lat: -3587715.2414932}
    //   ]
    // }]);
  });
};