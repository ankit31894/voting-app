var Poll = require('./models/polls');
module.exports={
    getAll:function(req,res,next){
        Poll.find({},function(err,polls){
            if(err)return next(err);
            res.json(polls);
        });
    }
}