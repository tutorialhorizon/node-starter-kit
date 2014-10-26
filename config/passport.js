var LocalStrategy   = require('passport-local').Strategy,
  async = require('async');

// Create a list of users just for demo.
// In reality, you will probably query a database
// to fetch this user
var users = {
  'one@example.com': {
    id: 'userOne',
    password: 'one',
    email: 'one@example.com'
  },
  'two@example.com': {
    id: 'userTwo',
    password: 'two',
    email: 'one@example.com'
  }
};

function createAccount (newUser, callback) {
    // Call API to create account
    users[newUser.email] = newUser;
    callback(null, newUser);
}

// Invokes callback with a non-empty object if email already exists, null otherwise
function findExistingEmail (email, callback) {
    // Call API to check if the email already exists
    if(users[email]) {
      callback({err: 'Email Already Exists'});
    } else {
      callback(null, null);
    }
}

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.email); // This is what passport will save in the session/cookie
  });

  passport.deserializeUser(function(email, done) {
    // Use the email saved in the session earlier
    // to fetch the actual user
    var user = users[email];
    done(null, user);
  });

  // We name our strategy 'local-login'.
  // You can use any name you wish
  // This is the name you will refer to later in a route
  // that handles the login
  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },
  function(req, email, password, done) {
    if(users[email] && users[email].password === password) {
      return done(null, users[email]);
    } else {
      done(null, false, req.flash('message', 'Invalid email or password'));
    }
  }));

  passport.use('local-signup',
    new LocalStrategy({
      usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // Pass back the entire request to the callback
      }, function (req, email, password, done) {

        process.nextTick(function() {

          async.auto({
            doesEmailAlreadyExist: function (cb, results) {
              findExistingEmail(email, cb);
            },
            newAccount: ['doesEmailAlreadyExist',
              function (cb, results) {

                var newUser = {
                  email: email,
                  password: password
                };
                createAccount(newUser, cb);
              }
            ]
          }, function (err, results) {
            if (err) {
              done(null, false, req.flash('signupMessage', err.message));
            } else {
              done(null, results.newAccount);
            }
          });

        });
    })
  );

};
