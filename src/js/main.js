import '../css/style.css'
import { darkModeHandling } from './darkModeHandling'
import { startGame } from './game'

darkModeHandling()

const startButton = document.querySelectorAll('#startGame')[0]
startButton.addEventListener('click', _ => startGame())
