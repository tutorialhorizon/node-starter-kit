module.exports = function(app, settings){
	var url = require('url'),
		express = require('express'),
		homeRouter = express.Router();

	homeRouter.use(function(req, res, next) {
	  
	  res.json({ 
	  	message: 'Hello Node'
	  });

	});

	app.use('/home',homeRouter);
};