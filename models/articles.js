var mongoose = require('mongoose');
var Schema = mongoose.schema;

var Article = new mongoose.Schema({
  title: String,
  short_description: String,
  long_description: String,
  author: String,
  created_at: Date,
  category_id: String
});
var Categpru = new mongoose.Schema({
  name: String,
  description: String
});

mongoose.model('Article', Article);
mongoose.model('Category', Category);
