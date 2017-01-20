'use strict';

angular.module('mood.controller', [])

.controller('MoodController', [
'$scope', '$http', 'moodService',
($scope, $http, moodService) => {
  $scope.getData = () => {
    $http.put('/api/watson/' + $scope.twitter)
      .then(response => {
        $scope.array = response.data;

        $scope.moodHue = moodService.determineMoodHue(response.data);

        $scope.conscientiousness = moodService.getConscientiousnessPercentage($scope.array);
        $scope.openness = moodService.getOpennessPercentage($scope.array);
        $scope.agreeableness = moodService.getAgreeablenessPercentage($scope.array);
        $scope.neuroticism = moodService.getNeuroticismPercentage($scope.array);
        $scope.extraversion = moodService.getExtraversionPercentage($scope.array);

        return $http({
          'method': 'POST',
          'url': '/api/watson/setMoodLight',
          'data': $scope.moodHue
        });
      }, err => {
        console.log(err);
      });
  };
}]);
