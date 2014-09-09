var _ = require('lodash')

var vowels = ['a', 'e', 'i', 'o', 'u', 'y']

function piggyAnyText(text, options) {
    var splitted = text.split(' ')
    var piggified = splitted.map(function(word) {
        return piggyOneWord(word.toLowerCase(), options)
    })
    return reconstruct(piggified)
}

function piggyOneWord(word) {
    var formatted = formatWord(word)
    if (isVowel(formatted[0]))       // If first letter is a vowel
        return piggyVowelWord(formatted)
    else
        return piggyConsonantWord(formatted)
}

// Use this method to piggy a word that starts with a vowel
function piggyVowelWord(word, options) {
    if (!options || !options.vowelEnding)   // If no options specified, do it MY way
        return word+'way'
    else                                    // Else return the specified option (but it's still the WRONG way to do it)
        return word+options.vowelEnding
}

// Method to piggy a word that starts w/ consonant
function piggyConsonantWord(word) {

    // Split the word into its two parts. I know this is ugly, but it works
    var vowelLocations = vowels.map(function(vowel) {
        return word.indexOf(vowel)
    })
    var firstVowelLocation = _.min(vowelLocations, function(location) {
        if (location < 0)
            return 100
        else return location
    })
    var part1 = word.slice(0, firstVowelLocation)
    var part2 = word.slice(firstVowelLocation, word.length)

    return part2+part1+'ay'
}

function reconstruct(piggified) {
    return piggified.join(' ')
}

function formatWord(word) {
    word = word.replace("'", "")
    return word
}

function isVowel(letter) {
    return !!_.find(vowels, function(vowel) {return vowel == letter.toLowerCase()})
}

module.exports = piggyAnyText