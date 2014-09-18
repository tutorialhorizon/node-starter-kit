module.exports = function(req, res, next){
	// Basic logging for all the routes
	console.log(req.method + ':' + req.originalUrl);
	next();
};