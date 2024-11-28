require('dotenv').config();
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let flash = require('connect-flash');
let mongoose = require('mongoose');

// Create Express app
let app = express();

// Import Routers
let indexRouter = require('../routes/index');
let stockRouter = require('../routes/stock');
let userRouter = require('../routes/user');

// MongoDB Setup
let DB = process.env.MONGODB_URI;
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('MongoDB Connected');
});

// View Engine Setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Session Setup
app.use(
  session({
    secret: 'SomeSecret',
    saveUninitialized: false,
    resave: false,
  })
);

// Initialize Flash Messages
app.use(flash());

// Passport.js Configuration
let User = require('../model/user'); 
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Mount Routers
app.use('/', indexRouter);
app.use('/stock', stockRouter);
app.use('/', userRouter); 

// Catch 404 and Forward to Error Handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// Export the App
module.exports = app;
