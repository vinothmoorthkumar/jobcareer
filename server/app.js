const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const passport = require('passport');
const expressValidator = require('express-validator');
const flash = require('connect-flash');


//import our created modules
const routesAdmin = require('./routes/admin');
const routesSite = require('./routes/site');

const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
// require('./handlers/passport');

//create our Express app
const app = express();

//take the raw requests and turn them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //search the extended true vs false
//populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// validating form data in validateRegister in userController 
app.use(expressValidator());

// app.use(session({
//   secret: process.env.SECRET,
//   key: process.env.KEY,
//   resave: false,
//   saveUninitialized: false,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));

// // Passport JS is what we use to handle our logins
// app.use(passport.initialize());
// app.use(passport.session());

// flash middleware let's us use req.flash
// app.use(flash());

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
// app.use((req, res, next) => {
//   res.locals.h = helpers;
//   res.locals.flashes = req.flash();
//   res.locals.user = req.user || null;
//   res.locals.currentPath = req.path;
//   next();
// });


// after all the above middleware, now we handle our routes
app.use('/admin',express.static(path.join(__dirname,"../client/admin/dist")));
// app.get('/admin', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/admin/dist/index.html'));
// });
app.use(express.static(path.join(__dirname,"../client/site/dist")));

// app.use('/', (req,res) => {
//   res.sendFile(path.join(__dirname,"../client/site/dist/index.html"))
// });

app.use('/api/admin', routesAdmin);
app.use('/api/site', routesSite);

// if the routes not found/has error then we show 404/forward them to error handlers 
// app.use(errorHandlers.notFound);
// one of our error handlers will see if these errors are just validation errors
// app.use(errorHandlers.flashValidationErrors);


// Otherwise this was a really bad error we didn't expect! Shoot eh
// if (app.get('env') === 'development') {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

// production error handler
// app.use(errorHandlers.productionErrors);

module.exports = app;

