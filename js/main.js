 /*----- constants -----*/
 const maxGuesses = 6;
const songLyrics = []

  /*----- state variables -----*/
 let currentWord = ''
 let guessedLetters = []
 let wrongGuesses = 0;
 let gameStarted = false;
  /*----- cached elements  -----*/
  const letterBoxes = document.querySelectorAll('.letter-box');
  const guessButton = document.getElementById('guessButton');
  const gameImage = document.querySelector('.game-image');

  /*----- event listeners -----*/


  /*----- functions -----*/
  function init()