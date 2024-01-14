export const darkModeHandling = _ => {
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
}