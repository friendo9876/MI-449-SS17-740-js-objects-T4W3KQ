// ----
// DATA
// ----

// A couple jokes to start with
var jokes = null
// console.log(window.localStorage.getItem('jokes'))
// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  jokes = JSON.parse(window.localStorage.getItem('jokes'))
  if (jokes !== null) {
    var jokeKeys = Object.keys(jokes)
    var jokeKeyListItems = jokeKeys.join('</li><li>')
    jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
  } else {
    jokeKeyListItems = noJokesMessage
    jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
  }
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  jokes = JSON.parse(window.localStorage.getItem('jokes'))
  var RequestedJoke = jokes['' + requestedJokeKey + '']
  if (RequestedJoke !== undefined) {
    jokeBox.innerHTML = '<p>' + RequestedJoke.setup + '</p><p>' + RequestedJoke.punchline + '</p>'
  } else {
    jokeBox.innerHTML = '<p>No matching joke found.</p>'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
// updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
var removeJokeName = document.getElementById('RemoveJokeName')
var removeJoke = document.getElementById('RemoveJoke')
var counter = window.localStorage.getItem('counter')
var setup = document.getElementById('Setup')
var jokeName = document.getElementById('JokeName')
var punchline = document.getElementById('Punchline')
var rememberJoke = document.getElementById('RememberJoke')

requestedJokeInput.addEventListener('input', updateDisplayedJoke)
rememberJoke.addEventListener('click', RememberJokeFunction)
window.addEventListener('load', localStorageValuesWhenLoadedFunction)
removeJoke.addEventListener('click', removeJokeFunction)

function localStorageValuesWhenLoadedFunction () {
  if (counter === null) {
    counter = 1
    jokes = {
      'the horse': {
        setup: 'A horse walks into the bar. The bartender asks...',
        punchline: 'Why the long face?'
      },
      'Orion\'s pants': {
        setup: 'How does Orion keep his pants up?',
        punchline: 'With an asteroid belt.'
      }
    }
    var jokestring = JSON.stringify(jokes)
    document.getElementById('counter').innerHTML = counter
    window.localStorage.setItem('counter', counter)
    window.localStorage.setItem('jokes', jokestring)
    updatePage()
  } else {
    counter = parseInt(counter) + 1
    window.localStorage.setItem('counter', counter)
    document.getElementById('counter').innerHTML = counter
    updatePage()
  }
}
function removeJokeFunction () {
  jokes = JSON.parse(window.localStorage.getItem('jokes'))
  delete jokes['' + removeJokeName.value + '']
  jokes = JSON.stringify(jokes)
  window.localStorage.setItem('jokes', jokes)
  updatePage()
  removeJokeName.value = ''
}
function RememberJokeFunction () {
  jokes = JSON.parse(window.localStorage.getItem('jokes'))
  if (jokeName.value !== '' && setup.value !== '' && punchline.value !== '') {
    jokes['' + jokeName.value + ''] = {setup: '' + setup.value + '', punchline: '' + punchline.value + ''}
    jokes = JSON.stringify(jokes)
    window.localStorage.setItem('jokes', jokes)
    updatePage()
    jokeName.value = null
    setup.value = null
    punchline.value = null
  }
}
