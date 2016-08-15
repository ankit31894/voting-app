var Poll = require('./models/polls');
module.exports={
    insertNew:function(req,res,next){
        var userId=req.user?req.user.id:req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        var data={
            optionId:req.body.optionId,
            userId:userId
        }
        Poll.count({"options._id":req.body.optionId,"options.votes.userId":userId},function(err,c){
            if(err)return next("Some Error Occured!");
            if(c!==0)return next("You have already voted");
            Poll.update({"options._id":req.body.optionId},{$addToSet:{'options.$.votes':data}},{new:true},function(err,o){
                if(err)return next("Some Error Occured!");
                res.json(o);
            });
        })
    }
}
