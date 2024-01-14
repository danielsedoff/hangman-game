import { WORDS } from "./constants"

const gameDiv = document.querySelectorAll('#game')[0]

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

export const startGame = _ => {
    const randomIndex = randomInt(0, WORDS.length - 1)
    const wordToGuess = WORDS[randomIndex]
    sessionStorage.setItem('wordToGuess', wordToGuess)

    gameDiv.innerHTML = `<h1>${wordToGuess}</h1>`
}