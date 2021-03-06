'use strict';

const express = require('express');
const router = express.Router();

const Personality = require('../models/personality');

const personalityInsightsApiVersion = 'v2';

const lightState = require('node-hue-api').lightState;
const q = require('q');

let watsonResponse;

router.put('/:twitteruser', function(req, res) {
  const twitterClient = req.app.get('twitterClient');
  const personalityInsightsClient = req.app.get('personalityInsightsClient');
  const username = req.params.twitteruser;

  const watsonFetch = function() {
    return new Promise(function(resolve) {
      const params = { screen_name: username, count: 5000 };
      twitterClient.get('statuses/user_timeline', params, function(error, tweets) {
        if(error) {
          console.log("Invalid Twitter handle.", error);
          return res.status(404).end();
        }

        if (!error) {
          if (!tweets) {
            console.log('No tweets found for user with handle: ' + req.params.twitteruser);
            return res.status(404).end();
          }

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

          watsonResponse = response;

          const resultArray = [];

          // There are only 3 child objects as the value of the tree property for now.
          // These serve as the aspects which will lead to an insight.
          // Personality, Needs, Values are the 3 aspects
          // This may change in the future.
          const aspects = response.tree.children;

          aspects.forEach(aspect => {
            aspect.children.forEach(trait => {
              // loop for traits of personality aspects
              const traitObject = { id: trait.id, percentage: trait.percentage };
              resultArray.push(traitObject);

              // loop for traits of traits of personality aspects
              trait.children.forEach(subTrait => {
                const subTraitObject = { id: subTrait.id, percentage: subTrait.percentage };
                resultArray.push(subTraitObject);
              });
            });
          });

          return res.json(resultArray);
        }
      });
    })
    .catch(function(e) {
      console.error(e);
    });
});

function savePersonalityResponse(username, rgb, response) {
  const personality = new Personality({
    twitter_handle: username,
    color: rgb,
    raw_response: response,
    api_version: personalityInsightsApiVersion,
  });

  personality.save(err => {
    if (err) {
      console.log(err);
    }
  });
}

router.post('/setMoodLight', function(req, res) {
  // Check for RGB values in req body
  if (typeof req.body.red === 'undefined') {
    return res.status(400).send({'error': 'Missing red value.'});
  }
  if (typeof req.body.green === 'undefined') {
    return res.status(400).send({'error': 'Missing green value.'});
  }
  if (typeof req.body.blue === 'undefined') {
    return res.status(400).send({'error': 'Missing blue value.'});
  }

  let hueApi = req.app.get('hueApiClient');
  let numberOfLights = req.app.get('numberOfLights');

  // Instantiate new lightState
  let state = lightState.create();

  // Set light colors for each light
  let lightStatePromises = [];
  for (let i = 1; i < (parseInt(numberOfLights) + 1); i++) {
    lightStatePromises.push(hueApi.setLightState(i, state.rgb(req.body.red, req.body.green, req.body.blue)));
  }

  const username = req.body.twitter_handle;
  const rgb = "rgb(" + req.body.red + ", " + req.body.green + ", " + req.body.blue + ")";
  const response = watsonResponse;

  savePersonalityResponse(username, rgb, response);

  return q.all(lightStatePromises)
    .catch(function (error) {
      console.log(error);
      return res.status(500).end();
    })
    .done(function(values){
      return res.status(200).end();
    });
});

module.exports = router;
