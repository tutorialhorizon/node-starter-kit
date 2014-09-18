module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();

	// Any generic logic can go here
	rootRouter.use(function(req, res, next) {
		next();
	});

	app.use('/',rootRouter);
};