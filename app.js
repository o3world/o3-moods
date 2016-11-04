'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const watson = require('watson-developer-cloud');

const routes = require('./routes/index');
const users = require('./routes/users');
const watsonRoutes = require('./routes/watson');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const twitterClient = new Twitter({
  consumer_key: process.env.O3_MOODS_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.O3_MOODS_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.O3_MOODS_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.O3_MOODS_TWITTER_ACCESS_TOKEN_SECRET
});
app.set('twitterClient', twitterClient);

const personalityInsightsClient = watson.personality_insights({
  username: process.env.O3_MOODS_INSIGHTS_USERNAME,
  password: process.env.O3_MOODS_INSIGHTS_PASSWORD,
  version: 'v2'
});
app.set('personalityInsightsClient', personalityInsightsClient);

app.use('/', routes);
app.use('/users', users);
app.use('/api/watson', watsonRoutes);

// error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
