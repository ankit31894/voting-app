var Poll = require('./models/polls');
var ObjectId = require('mongoose').Types.ObjectId; 
module.exports={
    insertNew:function(req,res,next){
        var userId=req.user?req.user.id:req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
        var optionId=req.body.optionId;
        var data={
            optionId:optionId,
            userId:userId
        }
        Poll.count({"options._id":optionId,"options.votes.userId":userId},function(err,c){
            if(err)return next("Some Error Occured!");
            if(c!==0)return next("You have already voted");
            Poll.update({"options._id":optionId},{$addToSet:{'options.$.votes':data}},{new:true},function(err,o){
                if(err)return next("Some Error Occured!");
                res.json(o);
            });
        })
    }
}
