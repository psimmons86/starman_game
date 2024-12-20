/*----- constants -----*/
const maxGuesses = 4;
const songLyrics = [
   {
       artist: "David Bowie",
       song: "Space Oddity",
       lyric: "GROUND CONTROL TO MAJOR TOM",
       hint: "🎵 The first line of this iconic space song"
   },
   {
       artist: "David Bowie",
       song: "Starman",
       lyric: "WAITING IN THE SKY",
       hint: "🎵 There's a starman..."
   },
   {
       artist: "David Bowie",
       song: "Life on Mars",
       lyric: "IS THERE LIFE ON MARS",
       hint: "🎵 The iconic question that titles this song"
   },
   {
       artist: "David Bowie",
       song: "Heroes",
       lyric: "WE CAN BE HEROES",
       hint: "🎵 Just for one day"
   },
   {
       artist: "David Bowie",
       song: "Ashes to Ashes",
       lyric: "ASHES TO ASHES FUNK TO FUNKY",
       hint: "🎵 We know Major Tom's a junkie"
   }
];

/*----- state variables -----*/
let currentWord = '';
let guessedLetters = new Set();
let wrongGuesses = 0;
let gameStarted = false;
let currentSong = null;
let currentScore = 0;
let highScore = 0;

/*----- cached elements -----*/
const letterBoxes = document.querySelectorAll('.letter-box');
const guessButton = document.getElementById('guessButton');
const gameImage = document.querySelector('.game-image.person');
const songInfoDisplay = document.querySelector('.song-info');
const hintDisplay = document.querySelector('.hint-display');
const wordDisplay = document.querySelector('.word-display');
const backgroundMusic = document.getElementById('backgroundMusic');
const winMusic = document.getElementById('winMusic');
const loseMusic = document.getElementById('loseMusic');

/*----- event listeners -----*/
guessButton.addEventListener('click', init);
letterBoxes.forEach(box => {
   box.addEventListener('click', () => handleLetterClick(box.textContent, box));
});

/*----- functions -----*/
function init() {
   currentSong = songLyrics[Math.floor(Math.random() * songLyrics.length)];
   currentWord = currentSong.lyric;
   guessedLetters = new Set();
   wrongGuesses = 0;
   gameStarted = true;
   currentScore = 0;
   
   winMusic.pause();
   winMusic.currentTime = 0;
   loseMusic.pause();
   loseMusic.currentTime = 0;
   backgroundMusic.volume = 0.3;
   backgroundMusic.currentTime = 0;
   backgroundMusic.play();

   gameImage.style.filter = 'brightness(1)';
   gameImage.style.transform = 'none';
   gameImage.style.opacity = '1';
   
   guessButton.textContent = 'Playing...';
   guessButton.classList.remove('win', 'lose');
   guessButton.style.display = 'none';
   
   letterBoxes.forEach(box => {
       box.classList.remove('correct', 'incorrect');
       box.style.pointerEvents = 'auto';
   });
   
   songInfoDisplay.textContent = `${currentSong.artist} - ${currentSong.song}`;
   hintDisplay.textContent = currentSong.hint;
   
   document.getElementById('currentScore').textContent = currentScore;
   document.getElementById('highScore').textContent = highScore;
   
   createWordDisplay();
}

function createWordDisplay() {
   wordDisplay.innerHTML = '';
   currentWord.split('').forEach(letter => {
       const letterSlot = document.createElement('span');
       letterSlot.className = 'letter-slot';
       letterSlot.textContent = letter === ' ' ? ' ' : '_';
       letterSlot.dataset.letter = letter;
       wordDisplay.appendChild(letterSlot);
   });
}

function handleLetterClick(letter, letterBox) {
   if (!gameStarted || guessedLetters.has(letter)) return;
   
   guessedLetters.add(letter);
   
   if (currentWord.includes(letter)) {
       letterBox.classList.add('correct');
       updateScore(true);
       updateWordDisplay();
   } else {
       wrongGuesses++;
       letterBox.classList.add('incorrect');
       updateGameImage();
   }
   
   letterBox.style.pointerEvents = 'none';
   checkGameEnd();
}

function updateWordDisplay() {
   const slots = document.querySelectorAll('.letter-slot');
   slots.forEach(slot => {
       if (guessedLetters.has(slot.dataset.letter)) {
           slot.textContent = slot.dataset.letter;
       }
   });
}

function updateGameImage() {
   const brightness = 1 - (wrongGuesses * 0.25);
   gameImage.style.filter = `brightness(${brightness})`;
   
   if (wrongGuesses === maxGuesses) {
       gameImage.style.transform = 'translateY(-20px)';
       gameImage.style.opacity = '0.1';
   }
}

function checkGameEnd() {
   if (hasWon()) {
       checkHighScore();
       guessButton.textContent = 'You saved them! Play Again?';
       guessButton.classList.add('win');
       guessButton.style.display = 'block';
       gameStarted = false;
       backgroundMusic.pause();
       winMusic.volume = 0.3;
       winMusic.play();
   } else if (wrongGuesses >= maxGuesses) {
       guessButton.textContent = 'They were abducted! Try Again?';
       guessButton.classList.add('lose');
       guessButton.style.display = 'block';
       gameStarted = false;
       backgroundMusic.pause();
       loseMusic.volume = 0.3;
       loseMusic.play();
   }
}

function hasWon() {
   return [...currentWord].every(letter => 
       letter === ' ' || guessedLetters.has(letter)
   );
}

function updateScore(isCorrect) {
   if (isCorrect) {
       currentScore += 10;
   }
   document.getElementById('currentScore').textContent = currentScore;
}

function checkHighScore() {
   if (currentScore > highScore) {
       highScore = currentScore;
       document.getElementById('highScore').textContent = highScore;
   }
}

function render() {
   updateWordDisplay();
   updateGameImage();
}

document.addEventListener('DOMContentLoaded', () => {
   render();
});