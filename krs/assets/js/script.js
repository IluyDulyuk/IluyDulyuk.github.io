window.addEventListener('DOMContentLoaded', () => {

    // Поиск

    const search = document.querySelector('.search');
    const searchOpenButtons = document.querySelectorAll('.search__open-button');
    const searchCloseButtons = document.querySelectorAll('.serach__close-button');

    function toggleSearch() {
        search.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    searchOpenButtons.forEach(button => {
        button.addEventListener('click', toggleSearch)
    });
    searchCloseButtons.forEach(button => {
        button.addEventListener('click', toggleSearch)
    });

    // Меню

    const menuDropdown = document.querySelector('.menu-dropdown');
    const menuDropdownTrigger = document.querySelectorAll('.menu-dropdown-trigger');

    function toggleMenuDropdown(button) {
        menuDropdown.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        button.classList.toggle('active');
    }

    menuDropdownTrigger.forEach(button => {
        button.addEventListener('click', () => {
            toggleMenuDropdown(button);
        });
    })

})
