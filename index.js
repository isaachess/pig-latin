var _ = require('lodash')

var vowels = ['a', 'e', 'i', 'o', 'u']
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

function piggyAnyText(text, options) {
    var splitted = text.split(' ')
    var piggified = splitted.map(function(word) {
        return piggyOneWord(word.toLowerCase(), options)
    })
    return reconstruct(piggified)
}

function piggyOneWord(word) {
    console.log('piggyOneWord',word)
    var bigBacon
    var formatted = formatWord(word)
    if (isVowel(formatted.wordPart[0]))       // If first letter is a vowel
        bigBacon = piggyVowelWord(formatted.wordPart)
    else
        bigBacon = piggyConsonantWord(formatted.wordPart)
    return bigBacon+formatted.puncPart
}

// Use this method to piggy a word that starts with a vowel
function piggyVowelWord(word, options) {
    console.log('piggyVowelWord',word, options)
    if (!options || !options.vowelEnding)   // If no options specified, do it MY way
        return word+'way'
    else                                    // Else return the specified option (but it's still the WRONG way to do it)
        return word+options.vowelEnding
}

// Method to piggy a word that starts w/ consonant
function piggyConsonantWord(word) {
    console.log('piggyConsonantWord',word)
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
    console.log('formatWord',word)
    word = word.replace("'", "")
    var arrayOfLetters = word.split("")
    console.log('arrayOfLetters',arrayOfLetters)
    var letterLocs = arrayOfLetters.map(function(letter) {
        return alphabet.indexOf(letter)
    })
    console.log('letterLocs',letterLocs)
    var startOfPunc = letterLocs.indexOf(-1)
    if (startOfPunc < 0) startOfPunc = word.length
    var wordPart = word.slice(0, startOfPunc)
    var puncPart = word.slice(startOfPunc, word.length)
    var x = {
        wordPart:wordPart,
        puncPart:puncPart
    }
    console.log('x',x)
    return x
}

function isVowel(letter) {
    console.log('isVowel',letter)
    return !!_.find(vowels, function(vowel) {return vowel == letter})
}

module.exports = piggyAnyText