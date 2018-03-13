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
    passport.use('user_login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {

            try{
                // check in mongo if a user with username exists or not
                User.findOne({ 'username' :  username},
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
                        // User and password both match, return user from done method
                        // which will be treated like success
                        return done(null, user);
                    }
                );
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
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
          console.log("Hellsdsdo");
            //var email = req.body.user_mail;
            // find a user in mongo with provided username
            try{
                User.findOne({ 'username':username }, function(err, user) {
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
                        user.username = username;
                        user.password = createHash(password);

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
