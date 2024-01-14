import '../css/style.css'

const toggleDark = document.querySelectorAll('#toggleDark')[0]
const doc = document.documentElement

if (localStorage.getItem('mode') === 'dark') {
  doc.classList.add('dark')
  toggleDark.checked = true
}

toggleDark.addEventListener('click', _ => {
  doc.classList.toggle('dark')
  if (doc.classList.contains('dark')) {
    localStorage.setItem('mode', 'dark')
  } else {
    localStorage.setItem('mode', 'light')
  }
})

localStorage.setItem('onlyStringsAreSaved', JSON.stringify({key:'value'})) // F12 -> Application -> Local Storage
const objectFromLocalStorage = JSON.parse(localStorage.getItem('onlyStringsAreSaved'))

const startButton = document.querySelectorAll('#startGame')[0]
startButton.addEventListener('click', _ => alert())