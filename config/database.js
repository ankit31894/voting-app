var mongoose=require('mongoose');
var URI = require('./' + process.env.config).db.url;
    //first database for production mode and second database for testing mode
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
module.exports = {
    connect:function(mode){
        mongoose.connect(URI);
    },
    drop:function(){
        mongoose.connect(URI,function(){
            /* Drop the DB */
            mongoose.connection.db.dropDatabase();
        });
    }
};
