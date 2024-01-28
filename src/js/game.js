import {createGameDiv, createKeyboard, createHangmanImg} from './createElements'

const gameDiv = document.querySelectorAll('#game')[0]
const LogoHeader = document.getElementById('logo')
let attemptsLeft

const quit = _ => {
    endGame('quit')
}

const doBadGuess = () => {
    attemptsLeft -= 1
    let attemptsLeftElement = document.getElementById('attempts-left')
    attemptsLeftElement.innerText = attemptsLeft

    const pic = document.getElementById('hangman-img')
    let imgNum = 10 - attemptsLeft
    if (imgNum > 9){
        endGame('fail')
    }
    pic.src = `images/hg-${imgNum}.png`
}

const checkWin = word => {
    let result = true
    word.split('').forEach((letter, i) => {
        if (document.getElementById(`letter_${i}`).innerText.toLowerCase() !== letter.toLowerCase()) result = false
    })
    return result
}

const doGoodGuess = (word, letter) => {
    let wordArray = word.split('')
    wordArray.forEach((curr, i) => {
        if (curr.toLowerCase() === letter.toLowerCase()){
            document.getElementById(`letter_${i}`).innerText = letter
        }
    });

    if(checkWin(word)) endGame('win')    
}

const checkLetter = keyElement => {
    let letter = keyElement.id
    let word = sessionStorage.getItem('wordToGuess').toLowerCase()
    let goodGuess = word.includes(letter.toLowerCase())

    if (!goodGuess) {
        doBadGuess()
    } else {
        doGoodGuess(word, letter)
        keyElement.disabled = true
    }
}

const createAttemptDiv = num => {
    return `<p id="attempts" class="mt-2">ATTEMPTS LEFT: <span id="attempts-left" class="font-medium text-red-600">${num}</span></p>`
}

// This function is called on click.
export const startGame = _ => {
    LogoHeader.classList.add('logo-sm')

    gameDiv.innerHTML = createGameDiv()
    gameDiv.innerHTML += createAttemptDiv(10)
    attemptsLeft = 10

    // gameDiv.innerHTML += createKeyboad | yields [object HTMLDivElement]
    let keyb = createKeyboard()
    keyb.addEventListener('click', event => {
        if (event.target.tagName.toLowerCase() !== 'button') return
        checkLetter(event.target)
    })
    gameDiv.appendChild(keyb)

    let hangmanImg = createHangmanImg(0)
    gameDiv.prepend(hangmanImg)

    gameDiv.insertAdjacentHTML('beforeend', '<button id="quit" class="button-secondary">Quit</button>')
    document.getElementById('quit').addEventListener('click', quit)
}

const endGame = status => {
    document.getElementById('keyboard').style.display = 'none'
    document.getElementById('placeholders').remove()
    document.getElementById('quit').remove()

    let resultHeader = document.createElement('h2')
    resultHeader.classList.add("result-header")

    if (status === 'win'){
        resultHeader.innerText = "You win!"
        resultHeader.classList.add('win')
        document.getElementById('hangman-img').src = 'images/hg-win.png'
    } else if (status === 'fail') {
        resultHeader.innerText = "You lose!"
        resultHeader.classList.add('lose')
    } else if (status === 'quit'){
        document.getElementById('hangman-img').remove()
        document.getElementById('logo').classList.remove('logo-sm')
    }

    let restartButton = document.createElement('button')
    restartButton.innerText = 'PLAY AGAIN'
    restartButton.classList.add('start-button')
    restartButton.classList.add('mt-10')
    document.getElementById('game').appendChild(resultHeader)
    document.getElementById('game').appendChild(restartButton)

    restartButton.addEventListener('click', startGame)
}