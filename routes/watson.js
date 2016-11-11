'use strict';

const express = require('express');
const router = express.Router();

router.put('/:twitteruser', function(req, res) {
  const twitterClient = req.app.get('twitterClient');
  const personalityInsightsClient = req.app.get('personalityInsightsClient');
  const username = req.params.twitteruser;

  const watsonFetch = function() {
    return new Promise(function(resolve) {
      const params = { screen_name: username, count: 5000 };
      twitterClient.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
          let test;
          for (let i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            test += tweets[i].text;
          }
          resolve(test);
        }
      });
    });
  };

  watsonFetch()
    .then(function(result) {
      personalityInsightsClient.profile({
        text: result,
        language: 'en'
      }, function(err, response) {
        if (err) {
          console.log('error:', err);
        } else {
          const array = [];
          const i = response.tree.children;
          i.forEach(function(thing) {
            thing.children.forEach(function(thing2) {
              const obj = { id: thing2.id, percentage: thing2.percentage };
              array.push(obj);
              thing2.children.forEach(function(thing4) {
                const obj = { id: thing4.id, percentage: thing4.percentage };
                array.push(obj);
              });
            });
          });
          console.log(array);
          return res.json(array);
        }
      });
    })
    .catch(function(e) {
      console.error(e);
    });
});


router.post('/setMoodLight', function(req, res) {
  let hueApi = req.app.get('hueApiClient');
  let displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
  };

  console.log(req.body);

  let state = lightState.create();

  hueApi.setLightState(1, state.rgb(req.body.red, req.body.green, req.body.blue))
    .then(displayResult)
    .done();
  hueApi.setLightState(2, state.rgb(req.body.red, req.body.green, req.body.blue))
    .then(displayResult)
    .done();
  hueApi.setLightState(3, state.rgb(req.body.red, req.body.green, req.body.blue))
    .then(displayResult)
    .done();
  return res.status(200);
});

module.exports = router;
