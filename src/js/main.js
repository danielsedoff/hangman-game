import '../css/style.css'
import { darkModeHandling } from './darkModeHandling'

darkModeHandling()

const startButton = document.querySelectorAll('#startGame')[0]
startButton.addEventListener('click', _ => alert())
