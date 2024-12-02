 /*----- constants -----*/
const maxGuesses = 6
const songLyrics = []

  /*----- state variables -----*/
 let currentWord = ''
 let guessedLetters = []
 let wrongGuesses = 0
 let gameStarted = false
  /*----- cached elements  -----*/
 const letterBoxes = document.querySelectorAll('.letter-box')
 const guessButton = document.getElementById('guessButton')
 const gameImage = document.querySelector('.game-image')
 const songInfoDisplay = document.querySelector('.song-info')
 const hintDisplay = document.querySelector('.hint-display')
 const wordDisplay = document.querySelector('.word-display')

  /*----- event listeners -----*/

guessButton.addEventListener('click', init)


  /*----- functions -----*/
  function init() {
    const randomSong = songLyrics[Math.floor(Math.random() * songLyrics.length)]
    currentWord = randomSong.lyric

    guessedLetters = new Set()
    wrongGuesses = 0
    gameStarted = true

    guessButton.textContent = 'Playing...'
  }

