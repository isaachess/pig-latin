var _ = require('lodash')

var vowels = ['a', 'e', 'i', 'o', 'u']
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

//////////////////////////////////////
///// The Big Pig functions //////////
//////////////////////////////////////

// This is the master method called in the module
function piggyAnyText(text, options) {
    var splitted,
        piggified,
        capitalized
    splitted = prepForThePig(text)
    piggified = splitted.map(function(word) {
        return piggyOneWord(word, options)
    })
    return reconstruct(piggified)
}

function piggyOneWord(word, options) {
    var bigBacon,
        formatted
    formatted = formatWord(word)

    // Send the word off to get piggified WITHOUT its punctuation
    if (isVowel(formatted.wordPart[0].toLowerCase()))     // If first letter is a vowel
        bigBacon = piggyVowelWord(formatted.wordPart, options)
    else                                    // If first letter is consonant
        bigBacon = piggyConsonantWord(formatted.wordPart)
    return bigBacon+formatted.puncPart      // Reattach punctuation when returning
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
    var vowelLocations,
        firstVowelLocation,
        wordWasCapitalized,
        part1,
        part2

    // Check if the word was capitalized before piggifying
    wordWasCapitalized = wasCapitalized(word)

    // Split the word into its two parts. I know this is ugly, but it works
    // First find all the vowels
    vowelLocations = vowels.map(function(vowel) {
        return word.indexOf(vowel)
    })
    // Then find the location of the first vowel
    firstVowelLocation = _.min(vowelLocations, function(location) {
        if (location < 0)
            return 100
        else return location
    })
    // Slice, dice, and reconstruct word
    part1 = word.slice(0, firstVowelLocation)
    part2 = word.slice(firstVowelLocation, word.length)

    // If the word was capitalized before piggifying
    if(wordWasCapitalized){
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
    text = text.replace(/-|–|—/g, ", ")     // Remove all dashes, because they are hecka hard to handle -- make them commas, instead
    text = text.split(' ')
    return text
}

function formatWord(word) {
    var arrayOfLetters,
        letterLocs,
        startOfPunc,
        wordPart,
        puncPart
    word = word.replace("'", "")            // Remove apostrophes, because the piggy Latin don't need no stinkin' apostrophes!

    // Split into an array of single letters
    arrayOfLetters = word.split('')
    // Find all the locations of letters, as opposed to other symbols
    letterLocs = arrayOfLetters.map(function(letter) {
        return alphabet.indexOf(letter.toLowerCase())
    })
    // Find where the punctuation begins -- this assumes punctuation is always at the END of a word
    startOfPunc = letterLocs.indexOf(-1)
    if (startOfPunc < 0) startOfPunc = word.length
    // Return the word and its punctuation separately -- they'll be reattached at the very end
    wordPart = word.slice(0, startOfPunc)
    puncPart = word.slice(startOfPunc, word.length)
    return {
        wordPart:wordPart,
        puncPart:puncPart
    }
}

//////////////////////////////////////
///// Helper functions ///////////////
//////////////////////////////////////

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
