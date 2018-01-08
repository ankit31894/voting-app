var Polls = require('./models/polls')
module.exports={
    insertNew:function(req,res,next){
        if(req.body.optionText.trim()===""){
            var er="Please enter a value";
            er.status=400;
            return next(er)
        }
        var data={
            optionText:req.body.optionText,
            createdAt:new Date,
            userId:req.user.id
        };
        Polls.findOneAndUpdate({'_id':req.body.pollId},{$push:{options:data}},{new:true},function(err,poll){    //new:true to get altered doc in callback
            if(err)return next("Some Error Occurred! Try Again");
            poll=poll.countVotes();
            res.json(poll);
        });
    }
}
