var request = require('supertest'),
	expect = require("chai").expect;

var express = require('express'),
	ROOT_DIR = __dirname + '/../..',
	config = require(ROOT_DIR + '/config'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	app = express();

var settings = {
		config: config
	};

// all environments
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: config.SESSION_SECRET , 
	saveUninitialized: true,
	resave: true 
}));

//This allows you to require files relative to the root in any file
requireFromRoot = (function(root) {
    return function(resource) {
        return require(root+"/"+resource);
    }
})(ROOT_DIR);

routes = require(ROOT_DIR + '/routes')(app, settings);

var log = console.log;

describe('#/api/users', function(){

	beforeEach(function(){

		// Done to prevent any server side console logs from the routes
  	// to appear on the console when running tests
		console.log=function(){};

	});

  it('- should GET users', function(done){
  	request(app)
      .get('/api/users')
      .end(function(err, res){
      	// Enable the console log
      	console.log = log;
      	var data = JSON.parse(res.text);
      	expect(err).to.be.null;
				expect(data.length).to.equal(3);
      	done();
      });
  });

  it('- should GET a user at index (1)', function(done){
  	request(app)
      .get('/api/users/1')
      .end(function(err, res){
      	// Enable the console log
      	console.log = log;
      	var data = JSON.parse(res.text);
      	expect(err).to.be.null;
				expect(data.name).to.equal('Jony Ive');
      	done();
      });
  });

  it('- should POST a user and get back a response', function(done){
  	var user = {
  		name: 'Steve Wozniak'
  	};

  	request(app)
      .post('/api/users')
      .send(user)
      .end(function(err, res){
      	// Enable the console log
      	console.log = log;
      	var data = JSON.parse(res.text);
      	expect(err).to.be.null;
				expect(data.name).to.equal(user.name);
      	done();
      });
  });

})