'use strict';

import './personality.module';
import './ramda.module';
import './percent.filter';

angular.module('app', [
  'personality',
  'percent.filter',
  'ramda'
]);
