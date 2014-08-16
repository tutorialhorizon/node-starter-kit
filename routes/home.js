var url = require('url');

var homeRouter = express.Router();

homeRouter.use(function(req, res, next) {
  
  res.json({ 
  	message: 'hi'
  });

});

app.use('/home',homeRouter);