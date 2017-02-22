'use strict';

angular.module('mood.controller', [])

.controller('MoodController', [
'$scope', '$http', 'moodService',
($scope, $http, moodService) => {

  $scope.appStart = true;
  $scope.twitterHandleSubmitted = false;

  $scope.getData = () => {
    $http.put('/api/watson/' + $scope.twitter)
      .then(response => {
        $scope.personalityData = response.data;

        $scope.moodHue = moodService.determineMoodHue(response.data);

        $scope.moodLightReqBody = $scope.moodHue;
        $scope.moodLightReqBody.twitter_handle = $scope.twitter;

        $scope.conscientiousness = moodService.getConscientiousnessPercentage($scope.personalityData);
        $scope.openness = moodService.getOpennessPercentage($scope.personalityData);
        $scope.agreeableness = moodService.getAgreeablenessPercentage($scope.personalityData);
        $scope.neuroticism = moodService.getNeuroticismPercentage($scope.personalityData);
        $scope.extraversion = moodService.getExtraversionPercentage($scope.personalityData);

        twitterHandleSubmit();

        determineColor();

        return $http({
          'method': 'POST',
          'url': '/api/watson/setMoodLight',
          'data': $scope.moodLightReqBody
        });
      }, err => {
        console.log(err);
      });
  };

  $scope.resetApp = () => {
    $scope.appStart = true;
    $scope.twitterHandleSubmitted = false;
    $scope.twitter = '';
    $scope.moodHue.red = 255;
    $scope.moodHue.green = 255;
    $scope.moodHue.blue = 255;
  };

  function twitterHandleSubmit() {
    $scope.appStart = false;
    $scope.twitterHandleSubmitted = true;
    $scope.loadState = false;
  }

  $scope.loading = () => {
    $scope.loadState = true;
  }

  function determineColor() {

    if ($scope.moodHue.red >= 228 && $scope.moodHue.blue >= 208 && $scope.moodHue.blue >= 10 && $scope.moodHue.blue <= 200) {
      $scope.colorResult = 'YELLOW';
      $scope.colorDescription = 'The shades of yellow show a range of emotions including imaginative, confused, upset, anxious, feeling poetic and deeply observing.';
    } else if ($scope.moodHue.red >= 112 && $scope.moodHue.green <= 194 && $scope.moodHue.blue <= 194) {
      $scope.colorResult = 'RED';
      $scope.colorDescription = 'Generally associated with emotional state of passion. Shows excitement, energy and adventure. At one end of deep red, it shows arousal, passion and love. Bright red shows anger, feelings of adventure, excitement or terror. Orange is a dare devilish feeling, stress and confusion. Dark orange is worry, aggression or tensed.';

      if ($scope.moodHue.red >= 190 && $scope.moodHue.green <= 192 && $scope.moodHue.blue >= 65 && $scope.moodHue.blue <= 165) {
        $scope.colorResult = 'PINK';
        $scope.colorDescription = 'Pink shows calm and relaxed feeling where bright pink shows affection, love and happiness.';
      } else if ($scope.moodHue.green >= 25 && $scope.moodHue.green <= 192 && $scope.moodHue.blue <= 145) {
        $scope.colorResult = 'BROWN';
        $scope.colorDescription = 'Brown generally means the person is feeling jittery and the mind is wandering.';
      }

    } else if ($scope.moodHue.red <= 178 && $scope.moodHue.green >= 90 && $scope.moodHue.blue <= 178) {
      $scope.colorResult = 'GREEN';
      $scope.colorDescription = 'Green generally reflects calm, peaceful, relaxed, energetic and wandering and mixed emotions.';

      if ($scope.moodHue.red >= 140 && $scope.moodHue.green <= 185 && $scope.moodHue.blue <= 145) {
        $scope.colorResult = 'BROWN';
        $scope.colorDescription = 'Brown generally means the person is feeling jittery and the mind is wandering.';
      }

    } else if ($scope.moodHue.red <= 204 && $scope.moodHue.green <= 204 && $scope.moodHue.blue >= 90) {
      $scope.colorResult = 'BLUE';
      $scope.colorDescription = 'Known as the color of optimism and joy, the ring will mean happiness, at peace. Blue can mean deep thinking, feeling flirty, intense moods, calm, love, passionate and romantic feeling.';

      if ($scope.moodHue.red <= 200 && $scope.moodHue.red >= 90 && $scope.moodHue.green <= 160 && $scope.moodHue.blue <= 255 && $scope.moodHue.blue >= 150) {
        $scope.colorResult = 'PURPLE';
        $scope.colorDescription = 'Purple reflects tranquil, satisfied, balanced inside, passionate, sensual and romantic. Reddish purple indicates anger, moody or desperate.';
      }
    }
  }
}]);
