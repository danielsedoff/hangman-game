import { WORDS } from "./constants"

const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

export const startGame = _ => {
    const randomIndex = randomInt(0, WORDS.length - 1)
    const wordToGuess = WORDS[randomIndex]
    alert(wordToGuess)
}