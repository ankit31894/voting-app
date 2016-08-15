var Poll = require('./models/polls');
module.exports={
    getById:function(req,res,next){
        Poll.findOne({_id:req.params.string},function(err,polls){
            if(err)return next("Some error occured");
            if(polls!==null)
            polls=polls.countVotes();
            res.json(polls);
        });
    }
}
