var mongoose = require('mongoose');
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
module.exports = function(passport){
//  console.log(passport);

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
    //  console.log("serrializing user",user);
        done(null, {id:user._id, user_role:user.user_role});
    });

    passport.deserializeUser(function(user, done) {
      //if user role is admin


        User.findById(user.id, function(err, user) {
            done(err, user);
        });

    });

    // passport config
//  passport.use(new LocalStrategy(user.authenticate()));
passport.use('user-login', new LocalStrategy({
  usernameField : 'user_mail',
  passwordField : 'user_pass',
        passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log("Test");
        try{
            var login_type =  req.body.login_type;
            if(login_type == undefined){
              return done("err", "Please specify login type");
            }
            // check in mongo if a user with username exists or not
            if(login_type == "facebook"){
              userAuth.findOne({$or:[{'facebook_id': req.body.facebook_id}, {'user_mail': req.body.user_mail}]}, function(err, user) {
                if(err){
                  return done(err+"Error data");
                }
                else if(!user){
                  var user = new userAuth();
                  user.user_mail = req.body.user_mail;
                  user.facebook_id = req.body.facebook_id;
                  user.user_name = req.body.user_name;
                  user.profile_pic = req.body.profile_pic;
                  user.device_token = req.body.device_token;
                  user.platform = req.body.platform;
                  user.user_type = "facebook";
                  user.save(function(err,user){
                      return done(null, user);
                  })
                }
                else {
                  user.device_token = req.body.device_token;
                  user.platform = req.body.platform;
                  user.first_time_login = false;
                  user.save(function(err, user){
                if(!err){
                   console.log("success of updating device token and ");
                }

              })
                  return done(null, user);
                }
              })

            }
            if(login_type == "google"){
              userAuth.findOne({$or:[{'google_id': req.body.google_id}, {'user_mail': req.body.facebook_mail}]}, function(err, user) {
                if(err){
                  return done(err+"Error data");
                }
                else if(!user){
                  var user = new userAuth();
                  user.user_mail = req.body.user_mail;
                  user.google_id = req.body.google_id;
                  user.user_name = req.body.user_name;
                  user.profile_pic = req.body.profile_pic;
                  user.device_token = req.body.device_token;
                  user.platform = req.body.platform;
                  user.user_type = "google";
                  user.save(function(err,user){
                      return done(null, user);
                  })
                }
                else {
                  user.device_token = req.body.device_token;
                  user.platform = req.body.platform;
                  user.first_time_login = false;
                  user.save(function(err, user){
                    if(!err){
                       console.log("success of updating device token and ");
                    }
                  })
                  return done(null, user);
                }
              })
            }
            if(login_type == "normal"){
              userAuth.findOne({ 'user_mail' :  username},
                  function(err, user) {
                      // In case of any error, return using the done method
                      if (err){
                          return done(err+"Error data");
                      }
                      // Username does not exist, log the error and redirect back
                      if (!user){
                          return done(null, false, { message: 'User Not Found with username' });
                      }
                      // User exists but wrong password, log the error
                      if (!isValidPassword(user, password)){
                          return done(null, false, { message: 'Invalid UserName Or Password' });
                      }
                      user.device_token = req.body.device_token;
                      user.platform = req.body.platform;
                      user.first_time_login = false;
                      user.save(function(err, user){
                    if(!err){
                       console.log("success of updating device token and ");
                    }

                  });
                      return done(null, user);
                  })
            }
        }
        catch(err){
            res.send({
                state:"error",
                message:err
            });
        }
    }
));

    passport.use('user_register', new LocalStrategy({
            usernameField : 'user_mail',
            passwordField : 'user_pass',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function(req, username, password, done) {
          console.log("Hellsdsdo");
            //var email = req.body.user_mail;
            // find a user in mongo with provided username
            try{
                User.findOne({ 'user_mail':user_mail }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        return done(err, { message: 'Error in SignUp' });
                    }
                    // already exists
                    if (user) {
                        return done(null, false, { message: 'User already exists with this username or email' });
                    }
                    // if there is no user, create the user
                    if (!user) {
                        var user = new User();
                        // if(req.body.user_mail=="admin@carz.com"){
                        //     franchisor.user_role = req.body;
                        // }
                        user.user_mail = username;
                        user.user_mail = createHash(password);

                        user.save(function(err,user){
                            return done(null, user);
                        })
                    }
                });
            }
            catch(err){
                res.send({
                    state:"error",
                    message:"Something went wrong"
                });
            }
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, franchisor.user_pass);
    };

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
    // Generates unique key bCrypt
    var createkey = function(key){
        return bCrypt.hashSync(key, bCrypt.genSaltSync(10), null);
    };

};
