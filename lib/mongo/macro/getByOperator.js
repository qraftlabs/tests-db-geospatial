var getConnection = require("./..");

module.exports = function (operator, callback) {
  getConnection(function (db) {
    db.collection("macros")
      .find({operator: operator})
      .toArray(callback);
  });
};