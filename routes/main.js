module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		rootRouter = express.Router();

	// Logic that is common to all the routes
	rootRouter.use(function(req, res, next) {
	  
	  console.log(req.method + ':' + req.originalUrl); // Basic logging for all the routes
	  next();

	});

	app.use('/',rootRouter);
};