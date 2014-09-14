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

	usersRouter.get('/:id', function(req, res, next){
		res.json(users[req.params.id - 1]);
	});

	usersRouter.get('/', function(req, res, next){
		res.json(users);
	});

	app.use('/api/users', usersRouter);

};