var mongoose = require('mongoose');
var Schema = mongoose.schema;

var User = new mongoose.Schema({
  username: String,
  password: String
});

mongoose.model('User', User);
