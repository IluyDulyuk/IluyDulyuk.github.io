const typeTabs = document.querySelectorAll('.type__item'),
      house = document.querySelector('.house'),
      materialTabs = document.querySelectorAll('.material__item');

typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        typeTabs.forEach(item => {
            item.classList.remove('active');
        })

        tab.classList.add('active');

        if(tab.getAttribute('data-name') == 'house') {
            const hide = document.querySelector('.more__hide'),
                  hideTrigger = document.querySelector('.more__btn');

            materialTabs.forEach(item => {
                item.addEventListener('click', () => {
                    materialTabs.forEach(el => {
                        el.classList.remove('active')
                    })

                    item.classList.add('active')
                })
            })

            hideTrigger.addEventListener('click', () => {
                if(hide.classList.contains('hide')) {
                    hide.classList.remove('hide')
                    hide.classList.add('show');
                    hide.style.display = 'block';
                    hideTrigger.textContent = 'Вернуться в упрощённый расчет'
                } else {
                    hide.classList.add('hide')
                    hide.classList.remove('show');
                    hide.style.display = 'none';
                    hideTrigger.textContent = 'Более точный расчет'
                }
            })

            house.style.display = 'block';
        }
    })
})