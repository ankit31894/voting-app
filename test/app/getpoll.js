// This test is for node JS

var db=require("../../config/database.js");
var should=require('should')
var inserter=require("../../app/insertpoll.js");
var optionInserter=require("../../app/insertoption.js");
var voteInserter=require("../../app/insertvote.js");
var Remover=require("../../app/deletepoll.js");
var getter=require("../../app/getpolls.js");

describe('Insert Poll Test', function() {
    this.timeout(5000);
    before(function(done) {
        db.connect(1);
        done();
    })
    after(function(done) {
        db.drop();
        done();
    })
    var pollId;
    var optId1,optId2;
    function th(done){
        return function(err){
            console.log(err);
            err.should.not.equal("");
            done();
        }
    }
    it('should insert a new poll with random polltext and some userId:user1', function(done) {
        inserter.insertNew({user:{id:"57aa645a655cea8f34f54a65"},body:{pollText:"Test Poll1"}},{json:function(record){
            record.pollText.should.eql("Test Poll1");
            record.userId.should.eql("57aa645a655cea8f34f54a65");
            pollId=record._id;
            done();
        }},th(done));
    });
    //this test will not enter any new entry but will rather create an error as pollId is not an ObjectID
    it('should not insert a new option in the above poll user1', function(done) {
        optionInserter.insertNew({body:{pollId:"create_an_error",optionText:"Test Option Error"},user:{id:"57aa645a655cea8f34f54a65"}},{json:function(record){
            [].length.should.eql(100);//this line should never be executed and if it executes then I have setted it to fail
            done();
        }},th(done));
    });
    it('should insert one option in the above poll user1', function(done) {
        optionInserter.insertNew({body:{pollId:pollId,optionText:"Test Option1"},user:{id:"57aa645a655cea8f34f54a65"}},{json:function(record){
            record.options.length.should.eql(1);
            record.options[0].optionText.should.eql("Test Option1");
            optId1=record._id;
            done();
        }},th(done));
    });
    it('should insert one more option in the above poll user2', function(done) {
        optionInserter.insertNew({body:{pollId:pollId,optionText:"Test Option2"},user:{id:"57aa645a655cea8f34f54a69"}},{json:function(record){
            record.options.length.should.eql(2);
            record.options[1].optionText.should.eql("Test Option2");
            optId2=record._id;
            done();
        }},th(done));
    });

    it('should insert one vote in the above poll', function(done) {
        voteInserter.insertNew({body:{optionId:optId1},user:{id:"57aa645a655cea8f34f54a65"}},{json:function(record){
            record.ok.should.eql(1);
            done();
        }},th(done));
    });


    it('should insert a new poll with random polltext and some userId:user2', function(done) {
        inserter.insertNew({user:{id:"57aa645a655cea8f34f54a69"},body:{pollText:"Test Poll2"}},{json:function(record){
            record.pollText.should.eql("Test Poll2");
            record.userId.should.eql("57aa645a655cea8f34f54a69");
			pollId=record._id;
			console.log("...Hello...");			

            done();
        }},th(done));
    });
    it('should insert one option in the above poll', function(done) {
        optionInserter.insertNew({body:{pollId:pollId,optionText:"Test Option2"},user:{id:"57aa645a655cea8f34f54a69"}},{json:function(record){
            record.options.length.should.eql(1);
            record.options[0].optionText.should.eql("Test Option2");
            optId2=record._id;
            done();
        }},th(done));
    });
    it('should retrieve all the polls and that poll will be two', function(done) {
        getter.getAll({},{json:function(record){
            record.length.should.eql(2);
            console.log(JSON.stringify(record));
            record[0].pollText.should.eql("Test Poll1");
            record[0].userId.should.eql("57aa645a655cea8f34f54a65");
            done();
        }},th(done));
    });
    it('should insert one vote in the above poll', function(done) {
        voteInserter.insertNew({body:{optionId:optId2},user:{id:"57aa645a655cea8f34f54a65"}},{json:function(record){
            record.ok.should.eql(1);
            done();
        }},th(done));
    });
    it('should remove the above TestPoll1 poll', function(done) {
        Remover.deleteById({params:{string:pollId},user:{id:"57aa645a655cea8f34f54a69"}},{json:function(record){
            record.result.ok.should.eql(1);
            done();
        }},th(done));
    });

    it('should retrieve all the polls and that poll will be only one', function(done) {
        getter.getAll({},{json:function(record){
            record.length.should.eql(1);
            record[0].pollText.should.eql("Test Poll1");
            record[0].userId.should.eql("57aa645a655cea8f34f54a65");
            pollId=record._id;
            done();
        }},th(done));
    });
});
