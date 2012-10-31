var getFieldsByOperatorAndCampaign = require("../data/fields/getByOperatorAndCampaign");
var getMacrosByOperator = require("../data/macro/getByOperator");

module.exports = function(app){
  
  app.get("/", function(req, res){
    res.render("index");
  });

  app.get("/api/fields", function (req, res) {
    getFieldsByOperatorAndCampaign(484, 3, function(err, result){
      if (err) return res.send(500, err);
      res.json(result);
    });
  });

  app.get("/api/macros", function (req, res) {
    getMacrosByOperator(484, function(err, result){
      if (err) return res.send(500, err);
      res.json(result);
    });
  });

};