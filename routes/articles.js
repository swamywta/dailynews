var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');
var Category = mongoose.model('Category');

/* GET users listing. */
router.post('/create_article', function(req, res) {
  Article.findOne({title: req.body.title}, function(err, article){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    if(article){
      res.send({
        state: 'failure',
        message: 'Article title already exists!'
      }, 400);
    }
    else {
      article = new Article();
      article.title = req.body.title;
      article.short_description = req.body.short_description;
      article.long_description = req.body.long_description;
      article.author = req.body.author;
      article.category_id = req.body.category_id;

      article.save(function(err, article){
        res.send({
          state: 'success',
          message: 'Article created successfully',
          data: article
        }, 200);
      })
    }
  })
});
/* GET users listing. */
router.put('/edit_article', function(req, res) {
  Article.findById({_id: req.body._id}, function(err, article){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    if(!article){
      res.send({
        state: 'failure',
        message: 'Article does not exists!'
      }, 400);
    }
    else {

      article.title = req.body.title;
      article.short_description = req.body.short_description;
      article.long_description = req.body.long_description;
      article.author = req.body.author;
      article.category_id = req.body.category_id;

      article.save(function(err, article){
        res.send({
          state: 'success',
          message: 'Article updated successfully',
          data: article
        }, 200);
      })
    }
  })
});
router.get('/get_articles', function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    else {
      res.send({
        state: 'success',
        message: articles
      }, 200);
    }
  })
});
router.delete('/delete_category/:id', function(req, res){
  Category.findByIdAndRemove({_id: req.params.id}, function(err, category){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    if(!category){
      res.send({
        state: 'failure',
        message: 'Category does not exisits'
      }, 400);
    }
    else {
      res.send({
        state: 'success',
        message: "Category deleted successfully!"
      }, 200);
    }
  })
});
/* GET users listing. */
router.put('/edit_category', function(req, res) {
  Article.findById({_id: req.body._id}, function(err, category){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    if(!category){
      res.send({
        state: 'failure',
        message: 'Category does not exists!'
      }, 400);
    }
    else {

      category.name = req.body.title;
      category.description = req.body.description;


      category.save(function(err, category){
        res.send({
          state: 'success',
          message: 'Category updated successfully',
          data: category
        }, 200);
      })
    }
  })
});
router.get('/get_categories', function(req, res){
  Category.find({}, function(err, categories){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    else {
      res.send({
        state: 'success',
        data: categories
      }, 200);
    }
  })
});
router.post('/create_category', function(req, res) {
  Category.findOne({name: req.body.name}, function(err, category){
    if(err){
      res.send({
        state: 'failure',
        message: 'Some error'
      }, 400);
    }
    if(category){
      res.send({
        state: 'failure',
        message: 'Category already exists!'
      }, 400);
    }
    else {
      category = new Category();
      category.name = req.body.name;
      category.description = req.body.description;
      category.save(function(err, category){
        res.send({
          state: 'success',
          message: 'Category created successfully',
          data: category
        }, 200);
      })
    }
  })
});

module.exports = router;
