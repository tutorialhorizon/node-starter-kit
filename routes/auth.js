module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		router = express.Router();

	router.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			message: 'Signed-in user. This is your profile.'
		});
	});

	app.get('/logout', function(req, res) {
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