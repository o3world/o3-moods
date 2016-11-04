'use strict';

angular.module('personality.service', [
  'ramda'
])

.factory('personalityService', [
'R',
(R) => {
  function determinePreference(profile) {
    const curiosityPercentage = getCuriosityPercentage(profile);
    const libertyPercentage = getLibertyPercentage(profile);

    if (curiosityPercentage >= 0.8 || libertyPercentage >= 0.8) {
      return 'light';
    } else if (curiosityPercentage >= 0.5 || libertyPercentage >= 0.5) {
      return 'medium';
    } else {
      return 'dark';
    }
  }

  const findCuriosity = R.find(R.propEq('id', 'Curiosity'));
  const findLiberty = R.find(R.propEq('id', 'Liberty'));

  const getPercentage = R.prop('percentage');

  const getCuriosityPercentage = R.pipe(findCuriosity, getPercentage);
  const getLibertyPercentage = R.pipe(findLiberty, getPercentage);

  return {
    determinePreference,
    getCuriosityPercentage,
    getLibertyPercentage
  };
}]);
