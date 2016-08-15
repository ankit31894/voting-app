var mongoose = require('mongoose');
var voteSchema=require('./votes.js')
// define the schema for our user model
var optionSchema = mongoose.Schema({
        optionText : String,
        createdAt:{ type: Date, default: Date.now },
        userId:String,
        votes:[voteSchema]

});
// create the model for users and expose it to our app
module.exports = optionSchema;
