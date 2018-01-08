var Poll = require('./models/polls');
module.exports={
    getAll:function(req,res,next){
        Poll.find({userId:req.user.id},function(err,polls){
            if(err)return next(err);
            var npolls=[];
            polls.forEach(function(poll){
                var temp=poll.countVotes();
                temp.noOfOptions=temp.options.length;
                temp.noOfVotes=(temp.options.length===0?0:temp.options.reduce(function(p,c){
                    return p+c.votes;
                },0));
                delete temp.options;
                npolls.push(temp);
            })
            res.json(npolls);
        });
    }
}
