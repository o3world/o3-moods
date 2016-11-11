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
