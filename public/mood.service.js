'use strict';

angular.module('mood.service', [
  'ramda'
])

.factory('moodService', [
'R',
(R) => {
  function determineMoodHue(profile) {
    const extraversionPercentage = getExtraversionPercentage(profile);
    const neuroticismPercentage = getNeuroticismPercentage(profile);
    const agreeablenessPercentage = getAgreeablenessPercentage(profile);
    const opennessPercentage = getOpennessPercentage(profile);
    const conscientiousnessPercentage = getConscientiousnessPercentage(profile);

    const extraversionModifier = getModifier(extraversionPercentage);
    const neuroticismModifier = getModifier(neuroticismPercentage);
    const agreeablenessModifier = getModifier(agreeablenessPercentage) * 0.25;
    const opennessModifier = getModifier(opennessPercentage) * 0.75;
    const conscientiousnessModifier = getModifier(conscientiousnessPercentage);

    let red = Math.round(neuroticismModifier),
        green = Math.round((agreeablenessModifier + opennessModifier)),
        blue = Math.round(conscientiousnessModifier);

    if (extraversionModifier >= 127) {
      red = (Math.round(neuroticismModifier) * 0.5) + (Math.round(extraversionModifier) * 0.5);
    } else {
      red = (Math.round(conscientiousnessModifier) * 0.5) + (Math.round(extraversionModifier) * 0.5);
    }

    let moodHue = {
      red: red,
      green: green,
      blue: blue
    };

    return moodHue;
  }

  const findExtraversion = R.find(R.propEq('id', 'Extraversion'));
  const findNeuroticism = R.find(R.propEq('id', 'Neuroticism'));
  const findAgreeableness = R.find(R.propEq('id', 'Agreeableness'));
  const findOpenness = R.find(R.propEq('id', 'Openness to change'));
  const findConscientiousness = R.find(R.propEq('id', 'Conscientiousness'));

  const getPercentage = R.prop('percentage');
  const getModifier = R.multiply(255);

  const getExtraversionPercentage = R.pipe(findExtraversion, getPercentage);
  const getNeuroticismPercentage = R.pipe(findNeuroticism, getPercentage);
  const getAgreeablenessPercentage = R.pipe(findAgreeableness, getPercentage);
  const getOpennessPercentage = R.pipe(findOpenness, getPercentage);
  const getConscientiousnessPercentage = R.pipe(findConscientiousness, getPercentage);

  return {
    determineMoodHue
  };
}]);
