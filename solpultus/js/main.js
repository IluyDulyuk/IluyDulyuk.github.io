const themeToggler = document.querySelector('.theme-switcher input');

const toggleTheme = () => {
    document.body.classList.toggle('dark')
}

themeToggler.addEventListener('change', () => {
    toggleTheme();
})
