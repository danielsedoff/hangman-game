import { WORDS, KEYBOARD_LETTERS } from './constants'

// Produce a pseudorandom integer in the given range
const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
}

// Create the placeholders, these will be HTML elements.
export const createPlaceholders = str => {
    let placeholders = Array.from('_'.repeat(str.length)).reduce(
        (acc, curr, i) => {
            return acc + `<h1 id="letter_${i}" class="letter">_</h1>`
        },
        ''
    )
    return `<div id="placeholders" class="placeholder-wrapper">${placeholders}</div>`
}

export const createKeyboard = () => {
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
export const createGameDiv = () => {
    const randomIndex = randomInt(0, WORDS.length - 1)
    const wordToGuess = WORDS[randomIndex]
    sessionStorage.setItem('wordToGuess', wordToGuess)
    return `<h1>${createPlaceholders(wordToGuess)}</h1>`
}

export const createHangmanImg = hg => {
    const hangmanImg = document.createElement('img')
    hangmanImg.src = `images/hg-${hg}.png`
    hangmanImg.alt = `hangman image ${hg}.png`
    hangmanImg.id = 'hangman-img'
    hangmanImg.classList.add('hangman-img')
    return hangmanImg
}
