import { WORDS } from "./constants"

const gameDiv = document.querySelectorAll('#game')[0]

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

const getPlaceholders = str => {
    let result = ''
    for (let i = 0; i < str.length; ++i){
        result += `<h1 id="letter_${i}" class="letter">_</h1>`
    }
    return `<div id="placeholders" class="placeholder-wrapper">${result}</div>`
}

export const startGame = _ => {
    const randomIndex = randomInt(0, WORDS.length - 1)
    const wordToGuess = WORDS[randomIndex]
    sessionStorage.setItem('wordToGuess', wordToGuess)

    gameDiv.innerHTML = `<h1>${getPlaceholders(wordToGuess)}</h1>`
}