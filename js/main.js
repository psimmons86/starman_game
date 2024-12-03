 /*----- constants -----*/
 const maxGuesses = 6
 const songLyrics = [
   {
       artist: "David Bowie",
       song: "Space Oddity",
       lyric: "GROUND CONTROL TO MAJOR TOM",
       hint: "🎵 ___ ___ ___ ___ ___...\nThe first line of this iconic space song"
   },
   {
       artist: "David Bowie",
       song: "Starman",
       lyric: "WAITING IN THE SKY",
       hint: "🎵 There's a starman ___ ___ ___ ___\nHe'd like to come and meet us"
   },
   {
       artist: "David Bowie",
       song: "Life on Mars",
       lyric: "IS THERE LIFE ON MARS",
       hint: "🎵 ___ ___ ___ ___ ___\nThe question that gives this song its title"
   },
   {
       artist: "David Bowie",
       song: "Heroes",
       lyric: "WE CAN BE HEROES",
       hint: "🎵 ___ ___ ___ ___\nJust for one day"
   },
   {
       artist: "David Bowie",
       song: "Changes",
       lyric: "TIME MAY CHANGE ME",
       hint: "🎵 ___ ___ ___ ___\nBut I can't trace time"
   },
   {
       artist: "David Bowie",
       song: "Let's Dance",
       lyric: "LETS SWAY WHILE COLOR LIGHTS UP YOUR FACE",
       hint: "🎵 ___ ___ ___ ___ ___ ___ ___ ___\nUnder the moonlight"
   },
   {
       artist: "David Bowie",
       song: "Modern Love",
       lyric: "I KNOW WHEN TO GO OUT",
       hint: "🎵 ___ ___ ___ ___ ___ ___\nAnd when to stay in"
   },
   {
       artist: "David Bowie",
       song: "Ashes to Ashes",
       lyric: "ASHES TO ASHES FUNK TO FUNKY",
       hint: "🎵 ___ ___ ___ ___ ___ ___\nWe know Major Tom's a junkie"
   }
 ]
 
   /*----- state variables -----*/
  let currentWord = ''
  let guessedLetters = []
  let wrongGuesses = 0
  let gameStarted = false
  let currentSong = null
   /*----- cached elements  -----*/
  const letterBoxes = document.querySelectorAll('.letter-box')
  const guessButton = document.getElementById('guessButton')
  const gameImage = document.querySelector('.game-image')
  const songInfoDisplay = document.querySelector('.song-info')
  const hintDisplay = document.querySelector('.hint-display')
  const wordDisplay = document.querySelector('.word-display')
  const messageDisplay = document.querySelector('.message-display')
  const backgroundMusic = document.getElementById('backgroundMusic')
 
   /*----- event listeners -----*/
 
 guessButton.addEventListener('click', init)
 letterBoxes.forEach(box => {
     box.addEventListener('click', () => handleLetterClick(box.textContent, box))
 })
 
   /*----- functions -----*/
   function init() {
    backgroundMusic.volume = 0.3
    backgroundMusic.play()
        .catch(error => console.log('Audio play failed:', error))
     const randomSong = songLyrics[Math.floor(Math.random() * songLyrics.length)]
     currentWord = randomSong.lyric
 
     guessedLetters = new Set()
     wrongGuesses = 0
     gameStarted = true
 
     guessButton.textContent = ''
 
     letterBoxes.forEach(box => {
         box.classList.remove('correct', 'incorrect')
         box.style.pointerEvents = 'auto'
     })
 
     songInfoDisplay.textContent = `${randomSong.artist} - ${randomSong.song}`
     hintDisplay.textContent = randomSong.hint
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
    if (!gameStarted || guessedLetters.has(letter)) {
        return
    }

    console.log('Letter clicked:', letter)
    guessedLetters.add(letter)
    
    if (!currentWord.includes(letter)) {
        wrongGuesses++
        console.log('Wrong guesses:', wrongGuesses)
    }
    
    render()
    checkGameEnd()
}

function render() {
    guessButton.textContent = gameStarted ? 'Playing...' : 'Start Game'
    songInfoDisplay.textContent = currentSong ? `${currentSong.artist} - ${currentSong.song}` : ''
    hintDisplay.textContent = currentSong ? currentSong.hint : ''
    
    document.querySelectorAll('.letter-slot').forEach(slot => {
        if (guessedLetters.has(slot.dataset.letter) || slot.dataset.letter === ' ') {
            slot.textContent = slot.dataset.letter
        }
    })
    
    letterBoxes.forEach(box => {
        const letter = box.textContent
        box.classList.remove('correct', 'incorrect')
        if (guessedLetters.has(letter)) {
            box.classList.add(currentWord.includes(letter) ? 'correct' : 'incorrect')
            box.style.pointerEvents = 'none'
        } else {
            box.style.pointerEvents = gameStarted ? 'auto' : 'none'
        }
    })
    if (gameStarted) {
        messageDisplay.classList.remove('show', 'win', 'lose')
    }
}
