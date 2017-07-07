var mongoose = require('mongoose');

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
module.exports = {
  connect: function () {
    mongoose.connect(process.env.MONGOLAB_URI);
  },
  drop: function () {
    mongoose.connect(process.env.MONGOLAB_URI, function () {
      mongoose.connection.db.dropDatabase();
    });
  }
};
