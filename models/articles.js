var mongoose = require('mongoose');
var Schema = mongoose.schema;

var Article = new mongoose.Schema({
  title: String,
  short_description: String,
  long_description: String,
  author: String,
  created_at: { type : Date, default: Date.now },
  category_id: String
});
var Category = new mongoose.Schema({
  name: String,
  description: String
});

mongoose.model('Article', Article);
mongoose.model('Category', Category);
