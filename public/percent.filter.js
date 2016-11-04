'use strict';

angular.module('percent.filter', [])

.filter('decimalToPercent', () => {
  return decimal => {
    const percent = decimal * 100;
    return percent + '%';
  };
});
