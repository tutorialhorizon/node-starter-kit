module.exports = function(app, settings){

	var url = require('url'),
		express = require('express'),
		usersRouter = express.Router();

	var users  = [
		{
			name: 'Tim Cook'
		},
		{
			name: 'Jony Ive'
		},
		{
			name: 'Steve Jobs'
		},
	];

	// Get a list of all the users
	usersRouter.get('/', function(req, res, next){
		res.json(users);
	});

	// Get the user at an index
	usersRouter.get('/:index', function(req, res, next){
		res.json(users[req.params.index]);
	});

	// Create a new user
	usersRouter.post('/', function(req, res, next){
		users.push(req.body);
		res.json(users[users.length - 1]);
	});

	app.use('/api/users', usersRouter);

};