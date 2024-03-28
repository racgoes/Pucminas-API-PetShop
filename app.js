var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const routesIndex = require('./routes/index');


var app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

// configure a port
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running on port ' + port);
});

app.use(session({
  secret: 'segredos',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000
  }
}))

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routesIndex);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
