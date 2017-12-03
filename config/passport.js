const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport)
{

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
     User.findById(id, function(err, user) {
        done(err, user);
     });
});

passport.use('signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        firstnameField : 'firstName',
        lastnameField : 'lastName',
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });   
    });  
}));




passport.use('login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
    	console.log("enter function");
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }).then( function(user) {
            // if there are any errors, return the error before anything else
            console.log("didnt make it");
            console.log(user);
            // if no user is found, return the message
            if (!user.email){
            	console.log("no user");
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
				};
                console.log("first if done")
            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
            	console.log("wrong pass");
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            };

            console.log("got user returning....")
            // all is well, return successful user
            return done(null, user);
        });

    }));
};