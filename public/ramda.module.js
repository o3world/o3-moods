'use strict';

angular.module('ramda', [])

.factory('R', [
'$window',
$window => {
  return $window.R;
}]);
