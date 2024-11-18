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

    // scroll menu

    const scrollMenu = document.querySelector('.scroll-menu');

    if(scrollMenu) {

        const header = document.querySelector('.header');
        const menu = document.querySelector('.menu-dropdown');

        function checkScroll() {
            if(window.scrollY >= header.offsetHeight) {
                return true;
            }

            return false;
        }

        function activeScrollMenu() {
            if(!scrollMenu.classList.contains('active')) {
                scrollMenu.classList.add('active');
                menu.classList.add('single-page');
            } else {
                return;
            }
        }

        function hideScrollMenu() {
            if(scrollMenu.classList.contains('active')) {
                scrollMenu.classList.remove('active');
                menu.classList.remove('single-page');
            } else {
                return;
            }
        }

        window.addEventListener('scroll', () => {
            if(checkScroll()) {
                activeScrollMenu();
            } else {
                hideScrollMenu();
            }
        })

    }

})
