var express = require('express');
var User = require('../models/users');
var router = express.Router();
var mongoose = require( 'mongoose' );
var path = require('path');
var bCrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


module.exports = function(passport){
  router.get('/success-login', function(req, res){
    console.log(req, "req");
    res.send({
      state: 'success',
      user: req.user,
      status: 200
    })
  });
  router.get('/failure-login', function(req, res){
    res.send({
      state: 'failure',
      user: null,
      status: 200,
      message: req.flash('error')
    })
  });

  router.post('/user_login', passport.authenticate('user_login', {
    failureRedirect: '/authenticate/failure-login',
    successRedirect: '/authenticate/success-login',
    failureFlash: true
  }));

  router.post('/user_register', passport.authenticate('user_register', {
    failureRedirect: '/authenticate/failure-login',
    successRedirect: '/authenticate/success-login',
    failureFlash: true
  }));

  return router;
}
