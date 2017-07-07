
var Poll = require('./models/polls');
module.exports={
    insertNew:function(req,res,next){
		console.log("G");
        if(req.body.pollText.trim()===""){
            var er="Please enter a value";
            er.status=400;
            return next(er)
        }
        var data={
            pollText:req.body.pollText,
            userId:req.user.id
        }
        var nPoll=new Poll(data);
        nPoll.save(function(err){
          if(err)return next("Unknown Error!");
          nPoll.mod=1;
          res.json(nPoll);
        });
    }
}
