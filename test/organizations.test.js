var organizations = require("../lib/organizations");
var getDb = require("../lib/data");
var async = require("async");

describe("organization", function(){


  beforeEach(function(done){
    getDb(function(db){
      this.db = db;
      this.orgCollection = this.db.collection("organizations");
      this.orgCollection.remove({} , function(){
        done();
      });
    }.bind(this));
  });

  describe("inserts", function(){
    beforeEach(function(done){
      this.orgCollection.insert({name: "test123"}, done);
    });

    it("should fail if it doesnt have name", function(done){
      organizations.insert({
        name: null
      }, function(err, result){
        err.message.should.eql("organization must have name");
        done();
      });
    });

    it("should insert if its okay", function(done){
      organizations.insert({
        name: "test"
      }, function(err, result){
        this.orgCollection.findOne({name: "test"}, function(err, result){
          result.name.should.eql("test");
          result.should.have.property("_id");
          done();
        }.bind(this));
      }.bind(this));
    });

    it("should fail if there is another organization with the same name", function(done){
      organizations.insert({
        name: "test123"
      }, function(err, result){
        err.message.should.be.eql("there is another organization with the same name");
        done();
      }.bind(this));
    });
  });

  describe("list", function(){

    it("should return organizations sorted by name", function(done){
      async.series([
        this.orgCollection.insert.bind(this.orgCollection, {name: "zortac"}, {safe: true}),
        this.orgCollection.insert.bind(this.orgCollection, {name: "alala"}, {safe: true})
      ], function(err, results){
        organizations.list(function(err, organizations){
          organizations[0].name.should.eql("alala");
          organizations[1].name.should.eql("zortac");
          done();
        });
      });
    });

  });

});