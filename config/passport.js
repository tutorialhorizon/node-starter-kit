var LocalStrategy   = require('passport-local').Strategy;

// Create a sample user for demo purpose
var sampleUser = {
  id: 1,
  email: 'user@example.com',
  password: 'unbreakable'
};

module.exports = function (passport) {

	passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Used to deserialize the user
  passport.deserializeUser(function(id, done) {
    if(id === sampleUser.id) {
      done(err, user);
    } else {
      done(err);
    }
  });

	return {};
}