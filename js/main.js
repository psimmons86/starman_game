/*----- constants -----*/
const maxGuesses = 6
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
]

/*----- state variables -----*/
let currentWord = ''
let guessedLetters = new Set()
let wrongGuesses = 0
let gameStarted = false
let currentSong = null
let currentScore = 0
let highScore = 0

/*----- cached elements -----*/
const letterBoxes = document.querySelectorAll('.letter-box')
const guessButton = document.getElementById('guessButton')
const gameImage = document.querySelector('.game-image')
const songInfoDisplay = document.querySelector('.song-info')
const hintDisplay = document.querySelector('.hint-display')
const wordDisplay = document.querySelector('.word-display')
const backgroundMusic = document.getElementById('backgroundMusic')
const musicToggle = document.getElementById('musicToggle')

/*----- event listeners -----*/
guessButton.addEventListener('click', init)
letterBoxes.forEach(box => {
   box.addEventListener('click', () => handleLetterClick(box.textContent, box))
})

musicToggle.addEventListener('click', toggleMusic)

/*----- functions -----*/
function init() {
   currentSong = songLyrics[Math.floor(Math.random() * songLyrics.length)]
   currentWord = currentSong.lyric
   guessedLetters = new Set()
   wrongGuesses = 0
   gameStarted = true
   currentScore = 0
   
   guessButton.textContent = 'Playing...'
   guessButton.classList.remove('win', 'lose')
   
   letterBoxes.forEach(box => {
       box.classList.remove('correct', 'incorrect')
       box.style.pointerEvents = 'auto'
   })
   
   songInfoDisplay.textContent = `${currentSong.artist} - ${currentSong.song}`
   hintDisplay.textContent = currentSong.hint
   
   document.getElementById('currentScore').textContent = currentScore
   document.getElementById('highScore').textContent = highScore
   
   createWordDisplay()
}

function createWordDisplay() {
   wordDisplay.innerHTML = ''
   currentWord.split('').forEach(letter => {
       const letterSlot = document.createElement('span')
       letterSlot.className = 'letter-slot'
       letterSlot.textContent = letter === ' ' ? ' ' : '_'
       letterSlot.dataset.letter = letter
       wordDisplay.appendChild(letterSlot)
   })
}

function handleLetterClick(letter, letterBox) {
   if (!gameStarted || guessedLetters.has(letter)) return
   
   guessedLetters.add(letter)
   
   if (currentWord.includes(letter)) {
       letterBox.classList.add('correct')
       updateScore(true)
       updateWordDisplay()
   } else {
       wrongGuesses++
       letterBox.classList.add('incorrect')
       updateGameImage()
   }
   
   letterBox.style.pointerEvents = 'none'
   checkGameEnd()
}

function updateWordDisplay() {
   const slots = document.querySelectorAll('.letter-slot')
   slots.forEach(slot => {
       if (guessedLetters.has(slot.dataset.letter)) {
           slot.textContent = slot.dataset.letter
       }
   })
}

function updateGameImage() {
   const brightness = 1 - (wrongGuesses * 0.15)
   gameImage.style.filter = `brightness(${brightness})`
   
   if (wrongGuesses === maxGuesses) {
       gameImage.style.transform = 'translateY(-20px)'
       gameImage.style.opacity = '0.5'
   }
}

function checkGameEnd() {
   if (hasWon()) {
       checkHighScore()
       guessButton.textContent = 'You saved them! Play Again?'
       guessButton.classList.add('win')
       gameStarted = false
   } else if (wrongGuesses >= maxGuesses) {
       guessButton.textContent = 'They were abducted! Try Again?'
       guessButton.classList.add('lose')
       gameStarted = false
   }
}

function hasWon() {
   return [...currentWord].every(letter => 
       letter === ' ' || guessedLetters.has(letter)
   )
}

function updateScore(isCorrect) {
   if (isCorrect) {
       currentScore += 10
   }
   document.getElementById('currentScore').textContent = currentScore
}

function checkHighScore() {
   if (currentScore > highScore) {
       highScore = currentScore
       document.getElementById('highScore').textContent = highScore
   }
}

function toggleMusic() {
   if (backgroundMusic.paused) {
       backgroundMusic.volume = 0.3
       backgroundMusic.play()
       musicToggle.textContent = '🔊 Music On'
       musicToggle.classList.add('playing')
   } else {
       backgroundMusic.pause()
       musicToggle.textContent = '🔊 Music Off'
       musicToggle.classList.remove('playing')
   }
}

document.addEventListener('DOMContentLoaded', () => {
   backgroundMusic.style.display = 'none'
   render()
})