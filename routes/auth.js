module.exports = function(app, settings){
  var url = require('url'),
    express = require('express'),
    router = express.Router(),
    passport = settings.passport;

  router.post('/local-login', passport.authenticate('local-login', {
    successRedirect : '/home.html',
    failureRedirect : '/login.html',
    failureFlash : true
  }));

  router.post('/local-signup', passport.authenticate('local-signup', {
    successRedirect : '/home.html',
    failureRedirect : '/signup.html',
    failureFlash : true
  }));

  app.use('/auth',router);
};
