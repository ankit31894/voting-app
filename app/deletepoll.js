var Poll = require('./models/polls');
module.exports={
    deleteById:function(req,res,next){
        Poll.remove({_id:req.params.string,userId:req.user.id},function(err,polls){
            if(err)return next("Some error occured");
            res.json(polls);
        });
    }
}
