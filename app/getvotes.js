var Vote = require('./models/votes');
module.exports={
	insertNew:function(req,res,next){
		Vote.count({optionId:req.params.string},function(err,c){
		    if(err)return next(err);
		    res.json(c);
		});
	}
}
