var _ = require('lodash')

var vowels = ['a', 'e', 'i', 'o', 'u']
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

//////////////////////////////////////
///// The Big Pig functions //////////
//////////////////////////////////////

// This is the master method called in the module
function piggyAnyText(text, options) {
    var arrayOfWords = prepForThePig(text)
    var piggified = arrayOfWords.map(function(word) {
        return piggyOneWord(word, options)
    })
    return reconstruct(piggified)
}

function piggyOneWord(word, options) {
    var formatted = formatWord(word)
    var bigBacon = piggyVowelOrConsonantWord(formatted.wordPart, options)
    // Send the word off to get piggified WITHOUT its punctuation
    return bigBacon+formatted.puncPart      // Reattach punctuation when returning
}

function piggyVowelOrConsonantWord(wordPart, options) {
    if (wordPart == '') return '';          // If the word is empty, return an empty string
    if (arrayStartsWithVowel(wordPart))     // If first letter is a vowel
        return piggyVowelWord(wordPart, options)
    else                                    // If first letter is consonant
        return piggyConsonantWord(wordPart)
}

// Use this method to piggy a word that starts with a vowel
function piggyVowelWord(word, options) {
    if (!options || !options.vowelEnding)   // If no options specified, do it MY way (AKA the "one-and-only-true" way)
        return word+'way'
    else                                    // Else return the specified option (but it's still the WRONG way to do it)
        return word+options.vowelEnding
}

// Method to piggy a word that starts w/ consonant
function piggyConsonantWord(word) {

    // Split the word into its two parts. I know this is ugly, but it works
    // First find all the vowels
    var vowelLocations = vowels.map(function(vowel) {
        return word.indexOf(vowel)
    })
    // Then find the location of the first vowel
    var firstVowelLocation = _.min(vowelLocations, function(location) {
        if (location < 0)
            return 100
        else return location
    })
    // Slice, dice, and reconstruct word
    var part1 = word.slice(0, firstVowelLocation)
    var part2 = word.slice(firstVowelLocation, word.length)

    // If the word was capitalized before piggifying
    if (wasCapitalized(word)) {
	// Set original first letter to lower case
	part1 = part1.charAt(0).toLowerCase() + part1.slice(1)
	// Capitalize the first letter of the word
	part2 = capitalizeWord(part2)
    }
    return part2+part1+'ay'
}

//////////////////////////////////////
///// Formatting functions ///////////
//////////////////////////////////////

function prepForThePig(text) {
    var noDashes = text.replace(/-|–|—/g, ", ")     // Remove all dashes, because they are hecka hard to handle -- make them commas, instead
    return noDashes.split(' ')
}

function formatWord(word) {
    var formatted = word.replace("'", "")            // Remove apostrophes, because the piggy Latin don't need no stinkin' apostrophes!

    // Split into an array of single letters
    var arrayOfLetters = formatted.split('')
    // Find all the locations of letters, as opposed to other symbols
    var letterLocs = arrayOfLetters.map(function(letter) {
        return alphabet.indexOf(letter.toLowerCase())
    })
    // Find where the punctuation begins -- this assumes punctuation is always at the END of a word
    var startOfPunc = letterLocs.indexOf(-1)
    var locationToUse = (startOfPunc < 0) ? word.length : startOfPunc
    // Return the word and its punctuation separately -- they'll be reattached at the very end
    return {
        wordPart: word.slice(0, locationToUse),
        puncPart: word.slice(locationToUse, word.length)
    }
}

//////////////////////////////////////
///// Helper functions ///////////////
//////////////////////////////////////

function arrayStartsWithVowel(array) {
    return isVowel(array[0].toLowerCase())
}

function reconstruct(piggified) {
    return piggified.join(' ')
}

function isVowel(letter) {
    return !!_.find(vowels, function(vowel) {return vowel == letter})
}

function endsSentence(char) {
    return char == "!" || char == "?" || char == "."
}

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function wasCapitalized(word) {
    var firstLetter = word.charAt(0);
    return firstLetter == firstLetter.toUpperCase();
}

module.exports = piggyAnyText
