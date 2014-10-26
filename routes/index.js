// Divide all of your modules in different files and
// require them here
module.exports = function(app, settings){
	require('./main')(app, settings);
	require('./auth')(app, settings);
  require('./home')(app, settings);
};
