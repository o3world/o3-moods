'use strict';

import './mood.module';
import './ramda.module';
import './percent.filter';

angular.module('app', [
  'mood',
  'percent.filter',
  'ramda'
]);
