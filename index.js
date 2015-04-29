var _ = require('lodash')

var vowels = ['a', 'e', 'i', 'o', 'u'];
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var containsLetters = /\w/g
var punctuationBeforeWord = /(\W+)(?=\w)/g
var punctuationAfterWord = /\W+$/g
var punctuation = /\W/g
var spaces = /\s+/g

//////////////////////////////////////
///// The Big Pig functions //////////
//////////////////////////////////////

// This is the master method called in the module
function piggyAnyText(text, options) {
  var arrayOfWords = prepForThePig(text);
  var piggified = arrayOfWords.map(function(word) {
    return piggyOneWord(word, options);
  })
  return reconstruct(piggified);
}

function piggyOneWord(word, options) {
  if (!word || word.length < 1) {
    return word;
  }
  var formatted = formatWord(word);
  var bigBacon = piggyVowelOrConsonantWord(formatted.wordPart, options);
    // Send the word off to get piggified WITHOUT its punctuation
  return formatted.startPuncPart + bigBacon + formatted.endPuncPart; // Reattach punctuation when returning
}

function piggyVowelOrConsonantWord(wordPart, options) {
  if (arrayStartsWithVowel(wordPart)) {
    // If first letter is a vowel
    return piggyVowelWord(wordPart, options);
  } else {
    // If first letter is consonant
    return piggyConsonantWord(wordPart);
  }
}

// Use this method to piggy a word that starts with a vowel
function piggyVowelWord(word, options) {
  if (!options || !options.vowelEnding){ // If no options specified, do it MY way (AKA the "one-and-only-true" way)
    return word + 'way';
  } else { // Else return the specified option (but it's still the WRONG way to do it)
    return word + options.vowelEnding;
  }
}

// Method to piggy a word that starts w/ consonant
function piggyConsonantWord(word) {

  // Split the word into its two parts. I know this is ugly, but it works
  // First find all the vowels
  var vowelLocations = vowels.map(function(vowel) {
      return word.indexOf(vowel);
  });
    // Then find the location of the first vowel
  var firstVowelLocation = _.min(vowelLocations, function(location) {
      if (location < 0){
        return 100;
      }
      return location;
    });
    // Slice, dice, and reconstruct word
  var part1 = word.slice(0, firstVowelLocation);
  var part2 = word.slice(firstVowelLocation, word.length);

  // If the word was capitalized before piggifying
  if (wasCapitalized(word)) {
    // Set original first letter to lower case
    part1 = part1.charAt(0).toLowerCase() + part1.slice(1);
      // Capitalize the first letter of the word
    part2 = capitalizeWord(part2);
  }
  return part2 + part1 + 'ay';
}

//////////////////////////////////////
///// Formatting functions ///////////
//////////////////////////////////////

function prepForThePig(text) {
  var noDashes = text.replace(/-|–|—/g, ", "); // Remove all dashes, because they are hecka hard to handle -- make them commas, instead
  return noDashes.split(spaces);
}

function formatWord(word) {

  var start = "";
  var beginningPuncMatches = word.match(punctuationBeforeWord);
  if(beginningPuncMatches && beginningPuncMatches.length > 0){
    start = beginningPuncMatches[0];
  }

  var end = "";
  var endPuncMatches = word.match(punctuationAfterWord);
  if(endPuncMatches && endPuncMatches.length > 0){
    end = endPuncMatches[0];
  }

  var plainWord = word.replace(punctuation, ""); // Remove apostrophes, because the piggy Latin don't need no stinkin' apostrophes!

  // Return the word and its punctuation separately -- they'll be reattached at the very end
  return {
    startPuncPart: start,
    wordPart: plainWord,
    endPuncPart: end
  }
}

//////////////////////////////////////
///// Helper functions ///////////////
//////////////////////////////////////

function arrayStartsWithVowel(array) {
  return isVowel(array[0].toLowerCase());
}

function reconstruct(piggified) {
  return piggified.join(' ');
}

function isVowel(letter) {
  return !!_.find(vowels, function(vowel) {
    return vowel == letter;
  })
}

function endsSentence(char) {
  return char == "!" || char == "?" || char == ".";
}

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function wasCapitalized(word) {
  var firstLetter = word.charAt(0);
  return firstLetter == firstLetter.toUpperCase();
}

module.exports = piggyAnyText;
