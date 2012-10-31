var getByOperatorAndCampaign = require("../data/fields/getByOperatorAndCampaign");

module.exports = function(app){
  
  app.get("/", function(req, res){
    res.render("index");
  });

  app.get("/api/fields", function (req, res) {
    getByOperatorAndCampaign(484, 3, function(err, result){
      if (err) return res.send(500, err);
      res.json(result);
    });
  });

};