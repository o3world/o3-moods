'use strict';

angular.module('mood.controller', [])

.controller('MoodController', [
'$scope', '$http', 'moodService',
($scope, $http, moodService) => {
  $scope.getData = () => {
    $http.put('/api/watson/' + $scope.twitter)
      .success(data => {
        $scope.array = data;

        $scope.moodHue = moodService.determineMoodHue(data);
      })
      .error(err => {
        console.log(err);
      });
  };
}]);
