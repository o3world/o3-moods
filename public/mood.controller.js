'use strict';

angular.module('mood.controller', [])

.controller('MoodController', [
'$scope', '$http', 'moodService', 'colorService',
($scope, $http, moodService, colorService) => {

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

        const moodHueHex = colorService.rgbToHex("rgb(" + $scope.moodHue.red + "," + $scope.moodHue.green + "," + $scope.moodHue.blue + ")");
        const hexWithoutHash = moodHueHex.replace('#', '');
        const closestHex = Array.closest(colorService.colorsList, hexWithoutHash)[0];
        const colorName = colorService.colors[closestHex];

        $scope.colorResult = colorService.determineColor(colorName);

        $scope.colorResultName = $scope.colorResult.name;
        $scope.colorResultDescription = $scope.colorResult.description;

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

  $scope.loading = () => {
    $scope.loadState = true;
  }

  function twitterHandleSubmit() {
    $scope.appStart = false;
    $scope.twitterHandleSubmitted = true;
    $scope.loadState = false;
  }

  Array.closest = (() => {
    function dist(s, t) {
        if (!s.length || !t.length) return 0;
        return dist(s.slice(2), t.slice(2)) +
            Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16));
    }

    return (arr, str) => {
        return arr.sort(function (a, b) {
            return dist(a, str) - dist(b, str);
        });
    };
  })();

}]);
