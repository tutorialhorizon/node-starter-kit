var LocalStrategy   = require('passport-local').Strategy,
  GitHubStrategy = require('passport-github').Strategy;

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
        return done(null, profile);
      });
    }
  ));

};