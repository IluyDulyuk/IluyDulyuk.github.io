window.addEventListener('DOMContentLoaded', () => {

    const _PASSWORD = '123';

    const loginForm = document.querySelector('.login form');
    if(loginForm) {

        const passwordInput = loginForm.querySelector('input');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            login(passwordInput);
        })

    }


    function cehckLogin() {

        const isLogin = document.cookie.split(';').indexOf('login=1') !== -1;
        const pathname = window.location.pathname;

        if(!isLogin && pathname == '/') {
            window.location.pathname = '/login.html';
        } else if(isLogin && pathname == '/login.html') {
            window.location.pathname = '/';
        }

    }

    function login(input) {
        if(_PASSWORD === input.value) {
            document.cookie = 'login=1';
            window.location.pathname = '/';
        } else {
            input.classList.add('error');
        }
    }

    cehckLogin();

})