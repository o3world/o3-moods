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
    const agreeablenessModifier = getModifier(agreeablenessPercentage);
    const opennessModifier = getModifier(opennessPercentage);
    const conscientiousnessModifier = getModifier(conscientiousnessPercentage);

    let red = Math.round(neuroticismModifier),
        green = Math.round((opennessModifier * 0.5) + (agreeablenessModifier * 0.5)),
        blue = Math.round(conscientiousnessModifier);

    if (extraversionModifier >= 127) {
      red = Math.round((neuroticismModifier * 0.5) + (extraversionModifier * 0.5));
    } else {
      blue = Math.round((conscientiousnessModifier * 0.5) + (extraversionModifier * 0.5));
    }

    if (red > blue && red > green) {
      blue = Math.max((blue - 50), 0);
      green = Math.max((green - 50), 0);
    } else if (blue > red && blue > green) {
      red = Math.max((red - 50), 0);
      green = Math.max((green - 50), 0);
    } else {
      red = Math.max((red - 50), 0);
      blue = Math.max((red - 50), 0);
    }

    let moodHue = {
      red: Math.min(red, 255),
      green: Math.min(green, 255),
      blue: Math.min(blue, 255)
    };

    return moodHue;
  }

  const traitIs = R.propEq('id');

  const findExtraversion = R.find(traitIs('Extraversion'));
  const findNeuroticism = R.find(traitIs('Neuroticism'));
  const findAgreeableness = R.find(traitIs('Agreeableness'));
  const findOpenness = R.find(traitIs('Openness to change'));
  const findConscientiousness = R.find(traitIs('Conscientiousness'));

  const getPercentage = R.prop('percentage');
  const getModifier = R.multiply(255);

  const getExtraversionPercentage = R.pipe(findExtraversion, getPercentage);
  const getNeuroticismPercentage = R.pipe(findNeuroticism, getPercentage);
  const getAgreeablenessPercentage = R.pipe(findAgreeableness, getPercentage);
  const getOpennessPercentage = R.pipe(findOpenness, getPercentage);
  const getConscientiousnessPercentage = R.pipe(findConscientiousness, getPercentage);

  return {
    getNeuroticismPercentage,
    getOpennessPercentage,
    getAgreeablenessPercentage,
    getConscientiousnessPercentage,
    getExtraversionPercentage,
    determineMoodHue
  };
}]);
