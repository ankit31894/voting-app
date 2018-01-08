var mongoose = require('mongoose');
var optionSchema=require('./options.js');
// define the schema for our user model
var pollSchema = mongoose.Schema({
        pollText: String,
        userId     : String,
        createdAt:{ type: Date, default: Date.now },
        options:[optionSchema]
    });
pollSchema.methods.countVotes=function(){
    var obj = this.toObject();
    obj.options.forEach(function(option){
        var count=parseInt(option.votes.length);
        delete option.votes;
        option.votes=count;
    });
    return obj;
}

// create the model for users and expose it to our app
module.exports = mongoose.model('Poll', pollSchema);
