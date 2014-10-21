var LocalStrategy   = require('passport-local').Strategy,
  GitHubStrategy = require('passport-github').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy;

var oauthSettings = require('../ignore/oauthSettings');

// Create a sample user for demo purpose
var sampleUser = {
  id: 1,
  email: 'user@example.com',
  password: 'unbreakable'
};

module.exports = function (passport) {

	passport.serializeUser(function(user, done) {
    console.log('Serializing user');
    done(null, user);
  });

  // Used to deserialize the user
  passport.deserializeUser(function(user, done) {
    console.log('Deserializing user');
    done(null, user);
  });

  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
    // callback with email and password from our form
    console.log('Authenticating User');
    if(email === sampleUser.email && password === sampleUser.password) {
      console.log('Authentication Successful');
      return done(null, sampleUser);
    } else {
      console.log('Authentication Failed');
      done(null, false, req.flash('message', 'Invalid email or password'));
    }
  }));

  // The most important function
  // The callback of this function gets invoked once 
  // the user grants permission to your application
  passport.use(new GitHubStrategy({
      clientID: oauthSettings.github.clientID,
      clientSecret: oauthSettings.github.clientSecret,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        
        // Important fields in the profile
        // profile.email; // can be null
        // profile.id; // Numeric user id
        // profile.login; // Username
        // profile.company;
        // profile.location; 
        // profile.repos_url;
        // profile.gists_url;
        // profile.blog; //
        // profile.html_url; // Full URL of the user's github profile
        console.log(profile);
        return done(null, profile);
      });
    }
  ));


  // The most important function
  // The callback of this function gets invoked once 
  // the user grants permission to your application
  passport.use(new FacebookStrategy({
      clientID: oauthSettings.facebook.clientID,
      clientSecret: oauthSettings.facebook.clientSecret,
      callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        
        console.log(profile);
        // Important fields in the profile
        // {
        //   id: 'numeric id',
        //   email: 'email@example.com',
        //   first_name: 'asd',
        //   gender: 'gender',
        //   last_name: 'lname',
        //   link: 'https://www.facebook.com/app_scoped_user_id/numeric_id/',
        //   locale: 'en_US',
        //   name: 'Full Name',
        //   timezone: -7,
        //   updated_time: '2014-10-20T05:52:58+0000',
        //   verified: true } 
        // }


        return done(null, profile);
      });
    }
  ));



};