var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/oauth_party_db';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB);
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db
