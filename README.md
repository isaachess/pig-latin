You're probably sitting there right now thinking, "My project would be so much better if the text were in a childish pseudo-language that is difficult to understand."

I was thinking the same thing too (about your project I mean). So I wrote this package for you.

# Installation
    npm install pig-latin

# Usage

Tired of pig-latin packages that don't actually work? We're not messing around here. This package includes:

- ACCURATE translation of words that start with vowels (with options, because some of you are crazy)
- ACCURATE dealing with punctuation (mostly -- I'm sure if you really tried you could break it)

```javascript
// Generic usage
var piglatin = require('pig-latin')
piglatin(text, options)
```

Let's see some examples:

```javascript
var piglatin = require('pig-latin')
piglatin("help help, I can't get up!")

=> 'elphay elphay, iway antcay etgay upway!'
```

# Options
This module takes an options object, which currently supports two options:

### vowelEnding
Apparently everyone in the world uses a different ending for words that start with vowels. By default it is "-way", but you can set it to any string here you'd like.

```javascript
// Default
piglatin("I am so happy inside")
=> 'iway amway osay appyhay insideway'

// Example 1 - not so crazy
piglatin("I am so happy inside", {vowelEnding: 'ay'})
=> 'iay amay osay appyhay insideay'

// Example 2 - get as crazy as you want
piglatin("I am so happy inside", {vowelEnding: 'juice'})
=> 'ijuice amjuice osay appyhay insidejuice'

// NOTE: this option only affects words that start with vowels
```

### Capitalize
If you want to capitalize each sentence, set this to true.

```javascript
piglatin("help! help! i can't get up!", {capitalize: true})

=> 'Elphay! Elphay! Iway antcay etgay upway!'
```

# Items to note

- Does not support dashes. Those will be removed and replaced with commas.