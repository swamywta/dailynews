var mongoose = require('mongoose');
var Schema = mongoose.schema;

var User = new mongoose.Schema({
  user_name: String,
  user_mail: String,
  user_pass: String,
  user_number: String,
  role: {type:String, default:'user'},
  user_status: {type:Number,default:0},//0 for User and 1 for Celeb
  device_token: String,
  facebook_id: String,
  platform: String,
  profile_pic: String,
  google_id: String,
  facebook_id: String,
  first_time_login: {type:Boolean,default:true},
  city: String,
  country: String  
});

mongoose.model('User', User);
