var mongoose = require('mongoose');

// define the schema for our user model
var voteSchema = mongoose.Schema({
        userId : String
});
// create the model for users and expose it to our app
module.exports = voteSchema;
