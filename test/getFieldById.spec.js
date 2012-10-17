var getDb = require("../lib/data"), 
  getFieldById = require("../lib/data/getFieldById");

describe("getFieldById", function(){


  it("can execute the query", function(done){
    getFieldById(20149, function(err, field){
      field.geometry.type.should.be.eql("Polygon");
      field.geometry.should.have.property("coordinates");
      field.gid.should.be.eql(20149); 
      field.should.have.property("name");
      done();
    });
  });


});