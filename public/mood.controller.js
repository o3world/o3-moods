'use strict';

angular.module('mood.controller', [])

.controller('MoodController', [
'$scope', '$http', 'moodService',
($scope, $http, moodService) => {
  $scope.getData = () => {
    $http.put('/api/watson/' + $scope.twitter)
      .success(data => {
        $scope.array = data;

        $scope.preference = moodService.determinePreference(data);
        $scope.curiosity = moodService.getCuriosityPercentage(data);
        $scope.liberty = moodService.getLibertyPercentage(data);
      })
      .error(err => {
        console.log(err);
      });
  };
}]);
