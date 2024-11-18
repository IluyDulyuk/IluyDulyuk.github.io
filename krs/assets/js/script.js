window.addEventListener('DOMContentLoaded', () => {

    // Поиск

    const search = document.querySelector('.search');
    const searchOpenButton = document.querySelector('.search__open-button');
    const searchCloseButton = document.querySelector('.serach__close-button');

    function toggleSearch() {
        search.classList.toggle('active');
    }

    searchOpenButton.addEventListener('click', toggleSearch);
    searchCloseButton.addEventListener('click', toggleSearch);

})
