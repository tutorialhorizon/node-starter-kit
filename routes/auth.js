module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		passport = settings.passport,
		router = express.Router();

	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login.html',
		failureFlash : true
	}));

	router.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			message: 'Signed-in user. This is your profile.'
		});
	});

	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/home');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/login.html');
	}

	app.use('/',router);
};