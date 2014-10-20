var LocalStrategy   = require('passport-local').Strategy;

// Create a sample user for demo purpose
var sampleUser = {
  id: 1,
  email: 'user@example.com',
  password: 'unbreakable'
};

module.exports = function (passport) {

	passport.serializeUser(function(user, done) {
    console.log('Serializing user');
    done(null, user.id);
  });

  // Used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log('Deserializing user');
    if(id === sampleUser.id) {
      done(null, sampleUser);
    } else {
      done({
        message: 'Error deserializing user'
      });
    }
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

};