'use strict';

angular.module('color.service', [
  'ramda'
])

.factory('colorService', [
'R',
(R) => {

  function rgbToHex(rgb){
   rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
   return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }

  const colors = {
    '191970': 'midnightblue',
    '800080': 'purple',
    '808000': 'olive',
    'f0f8ff': 'aliceblue',
    'faebd7': 'antiquewhite',
    '00ffff': 'cyan',
    '000000': 'black',
    '0000ff': 'blue',
    'a52a2a': 'brown',
    '6495ed': 'cornflowerblue',
    '00008b': 'darkblue',
    '008b8b': 'darkcyan',
    'a9a9a9': 'darkgray',
    '006400': 'darkgreen',
    '556b2f': 'darkolivegreen',
    'ff8c00': 'darkorange',
    '8b0000': 'darkred',
    '8fbc8f': 'darkseagreen',
    '00ced1': 'darkturquoise',
    '9400d3': 'darkviolet',
    'ff1493': 'deeppink',
    '00bfff': 'deepskyblue',
    '1e90ff': 'dodgerblue',
    'fffaf0': 'floralwhite',
    '228b22': 'forestgreen',
    'f8f8ff': 'ghostwhite',
    '008000': 'green',
    'ff69b4': 'hotpink',
    '4b0082': 'indigo',
    '7cfc00': 'lawngreen',
    'add8e6': 'lightblue',
    'e0ffff': 'lightcyan',
    'fafad2': 'lightgoldenrodyellow',
    'd3d3d3': 'lightgray',
    '90ee90': 'lightgreen',
    'ffb6c1': 'lightpink',
    'ffa07a': 'lightsalmon',
    '20b2aa': 'lightseagreen',
    '87cefa': 'lightskyblue',
    'b0c4de': 'lightsteelblue',
    'ffffe0': 'lightyellow',
    '32cd32': 'limegreen',
    '0000cd': 'mediumblue',
    '9370db': 'mediumpurple',
    '3cb371': 'mediumseagreen',
    '00fa9a': 'mediumspringgreen',
    '48d1cc': 'mediumturquoise',
    'ffa500': 'orange',
    '98fb98': 'palegreen',
    'ffc0cb': 'pink',
    'b0e0e6': 'powderblue',
    'ff0000': 'red',
    '8b4513': 'saddlebrown',
    'f4a460': 'sandybrown',
    '2e8b57': 'seagreen',
    '87ceeb': 'skyblue',
    '00ff7f': 'springgreen',
    '40e0d0': 'turquoise',
    'ee82ee': 'violet',
    'ffffff': 'white',
    'f5f5f5': 'whitesmoke',
    'ffff00': 'yellow',
  };

  const colorsList = [];
  for(const key in colors) {
      colorsList.push(key);
  }

  function determineColor(color) {

    if (color.includes('white')) {
      let colorResult = {
        name: 'White',
        description: 'White indicates confusion, boredom or frustration.'
      };

      return colorResult;

    } else if (color.includes('gray')) {
      let colorResult = {
        name: 'Gray',
        description: 'Not often seen, gray indicates a state of being anxious, afraid, sad, or exhausted.'
      };

      return colorResult;

    } else if (color.includes('green') || color.includes('turquoise') || color.includes('olive')) {
      let colorResult = {
        name: 'Green',
        description: 'Green generally reflects calm, peaceful, relaxed, energetic and wandering and mixed emotions.'
      };

      return colorResult;

    } else if (color.includes('blue') || color.includes('cyan') || color.includes('indigo')) {
      let colorResult = {
        name: 'Blue',
        description: 'Blue can mean deep thinking, feeling flirty, intense moods, calm, love, passionate and romantic feeling.'
      };

      return colorResult;

    } else if (color.includes('red')) {
      let colorResult = {
        name: 'Red',
        description: 'Generally associated with emotional state of passion, red shows excitement, energy and adventure'
      };

      return colorResult;

    } else if (color.includes('orange')) {
      let colorResult = {
        name: 'Orange',
        description: 'Orange indicates a feeling of daring, stress and aggression.'
      };

      return colorResult;

    } else if (color.includes('purple') || color.includes('violet')) {
      let colorResult = {
        name: 'Purple',
        description: 'Purple indicates a person who is tranquil, satisfied, balanced inside, passionate, sensual and romantic. Reddish purple indicates anger, moodiness or desperation.'
      };

      return colorResult;

    } else if (color.includes('pink') || color.includes('salmon')) {
      let colorResult = {
        name: 'Pink',
        description: 'Pink shows a calm and relaxed feeling where bright pink shows affection, love and happiness.'
      };

      return colorResult;

    } else if (color.includes('brown')) {
      let colorResult = {
        name: 'Brown',
        description: 'Brown indicates a person who is scared, tense or restless.'
      };

      return colorResult;

    } else if (color.includes('yellow')) {
      let colorResult = {
        name: 'Yellow',
        description: 'The shades of yellow show a range of emotions including imaginative, confused, upset, anxious, feeling poetic and deeply observing.'
      };

      return colorResult;
    }

  }

  return {
    rgbToHex,
    colors,
    colorsList,
    determineColor,
  };

}]);
