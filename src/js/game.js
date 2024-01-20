import { WORDS } from "./constants"

const gameDiv = document.querySelectorAll('#game')[0]

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const getPlaceholders = str => {
    let placeholders = Array.from('_'.repeat(str.length)).reduce((acc, curr, i) => {
        return acc + `<h1 id="letter_${i}" class="letter">_</h1>`
    }, '')

    return `<div id="placeholders" class="placeholder-wrapper">${placeholders}</div>`
}

const createGameDiv = () => {
    const randomIndex = randomInt(0, WORDS.length - 1)
    const wordToGuess = WORDS[randomIndex]
    sessionStorage.setItem('wordToGuess', wordToGuess)
    return `<h1>${getPlaceholders(wordToGuess)}</h1>`
}


export const startGame = _ => {
    gameDiv.innerHTML = createGameDiv()
}