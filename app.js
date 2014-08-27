/**
 * Module dependencies.
 */

//Global variables : Since they are not declared using the var keyword
express = require('express'),
rootDir = __dirname,
config = require('./config'),
http = require('http'),
path = require('path'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
app = express();

// all environments
app.set('port', config.PORT || process.env.port || 3000);
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({secret: config.SESSION_SECRET}));
app.use(express.static(__dirname + '/public'));


//This allows you to require files relative to the root http://goo.gl/5RkiMR
requireFromRoot = (function(root) {
    return function(resource) {
        return require(root+"/"+resource);
    }
})(__dirname);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//http://goo.gl/RNFPlJ
routes = require('./routes');