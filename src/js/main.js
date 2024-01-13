import '../css/style.css'

const toggleDark = document.querySelectorAll('#toggleDark')[0]
toggleDark.addEventListener('click', _ => document.documentElement.classList.toggle('dark'))