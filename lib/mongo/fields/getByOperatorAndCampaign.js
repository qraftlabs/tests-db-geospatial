var getConnection = require("./..");

module.exports = function (operator, campaign , callback) {
  getConnection(function (db) {
    db.collection("fields")
      .find({operator: operator, campaign: campaign})
      .toArray(callback);
  });
};