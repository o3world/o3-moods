'use strict';

angular.module('mood.controller', [])

.controller('MoodController', [
'$scope', '$http', 'moodService',
($scope, $http, moodService) => {
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

        return $http({
          'method': 'POST',
          'url': '/api/watson/setMoodLight',
          'data': $scope.moodLightReqBody
        });
      }, err => {
        console.log(err);
      });
  };
}]);
