import { WORDS, KEYBOARD_LETTERS } from './constants'

const gameDiv = document.querySelectorAll('#game')[0]
const LogoHeader = document.getElementById('logo')
let attemptsLeft

// Produce a pseudorandom integer in the given range
const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

// Create the placeholders, these will be HTML elements.
const createPlaceholders = str => {
    let placeholders = Array.from('_'.repeat(str.length)).reduce(
        (acc, curr, i) => {
            return acc + `<h1 id="letter_${i}" class="letter">_</h1>`
        },
        ''
    )
    return `<div id="placeholders" class="placeholder-wrapper">${placeholders}</div>`
}

const createKeyboard = () => {
    let keyboard = document.createElement('div')
    keyboard.classList.add('keyboard')
    keyboard.id = 'keyboard'

    const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
        let button = `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
        return acc + button
    }, '')

    keyboard.innerHTML = keyboardHTML
    return keyboard
}

// Assemble the whole Game div element from components.
const createGameDiv = () => {
    const randomIndex = randomInt(0, WORDS.length - 1)
    const wordToGuess = WORDS[randomIndex]
    sessionStorage.setItem('wordToGuess', wordToGuess)
    return `<h1>${createPlaceholders(wordToGuess)}</h1>`
}

const createHangmanImg = hg => {
    const hangmanImg = document.createElement('img')
    hangmanImg.src = `images/hg-${hg}.png`
    hangmanImg.alt = `hangman image ${hg}.png`
    hangmanImg.id = 'hangman-img'
    hangmanImg.classList.add('hangman-img')

    return hangmanImg
}

const doBadGuess = () => {
    attemptsLeft -= 1
    let attemptsLeftElement = document.getElementById('attempts-left')
    attemptsLeftElement.innerText = attemptsLeft

    const pic = document.getElementById('hangman-img')
    let imgNum = 10 - attemptsLeft
    if (imgNum > 9){
        let keyb = document.getElementById('keyboard')
        keyb.style += '; display: none; '
    }
    pic.src = `images/hg-${imgNum}.png`
}

const doGoodGuess = (word, letter) => {
    let wordArray = word.split('')
    wordArray.forEach((curr, i) => {
        if (curr.toLowerCase() === letter.toLowerCase()){
            document.getElementById(`letter_${i}`).innerText = letter
        }
    });
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
}
