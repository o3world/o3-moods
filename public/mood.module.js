'use strict';

import './mood.controller';
import './mood.service';
import './color.service';

angular.module('mood', [
  'mood.controller',
  'mood.service',
  'color.service'
]);
