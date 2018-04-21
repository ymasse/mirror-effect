const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const morgan = require('morgan');
let config = require('config'); //we load the db location from the JSON files
var passport = require('passport');
var cookieParser = require('cookie-parser');


const firebaseMiddleware = require('express-firebase-middleware');

// API file for interacting with MongoDB
//const api = require('./server/routes/api');
const api = require('./server/routes');

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// TODO: Check if we need this.  Morgan is a logger.
app.use(morgan('dev'));

// Passport is used for authentication/authorization
app.use(passport.initialize());



// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// TODO (yanmas1): Remove this to protect the websiste from unknown calls.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// API location
//app.use('/api', jwtCheck, api);
// Uncomment and replace the next line when integration api authentication.
//app.use('/api', firebaseMiddleware.auth, api);
app.use('/api', api )

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });

// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });

server.listen(port, () => console.log(`Running on localhost:${port}`)); 

module.exports = server;