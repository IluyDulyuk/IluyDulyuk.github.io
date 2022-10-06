const typeTabs = document.querySelectorAll('.type__item'),
      house = document.querySelector('.house'),
      foundation = document.querySelector('.foundation'),
      fence = document.querySelector('.fence'),
      warm = document.querySelector('.warm'),
      mixtures = document.querySelector('.mixtures'),
      materialTabs = document.querySelectorAll('.material__item');


materialTabs.forEach(item => {
    item.addEventListener('click', () => {
        materialTabs.forEach(el => {
            el.classList.remove('active')
        })

        item.classList.add('active')
    })
})

typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        typeTabs.forEach(item => {
            item.classList.remove('active');
        })

        tab.classList.add('active');
        house.style.display = 'none';
        foundation.style.display = 'none';
        fence.style.display = 'none';
        warm.style.display = 'none';
        mixtures.style.display = 'none';

        if(tab.getAttribute('data-name') == 'house') {
            house.style.display = 'block';
        }

        if(tab.getAttribute('data-name') == 'foundation') {
            foundation.style.display = 'block';
        }

        if(tab.getAttribute('data-name') == 'fence') {
            fence.style.display = 'block';
        }

        if(tab.getAttribute('data-name') == 'warm') {
            warm.style.display = 'block';
        }

        if(tab.getAttribute('data-name') == 'mixtures') {
            mixtures.style.display = 'block';
        }
    })
})

const hide = document.querySelector('.more__hide'),
      hideTrigger = document.querySelector('.more__btn');

hideTrigger.addEventListener('click', () => {
    if(hide.classList.contains('hide')) {
        hide.classList.remove('hide')
        hide.classList.add('show')
        hide.style.display = 'block';
        hideTrigger.textContent = 'Вернуться в упрощённый расчет';
    } else {
        hide.classList.add('hide')
        hide.classList.remove('show')
        hide.style.display = 'none';
        hideTrigger.textContent = 'Более точный расчет';
    }
})

const inputItems = document.querySelectorAll('.inputs__item');

inputItems.forEach(input => {
    const inputs = input.querySelectorAll('input');

    inputs.forEach(inputItem => {


        if(inputItem.getAttribute('type') == 'range') {
            inputItem.addEventListener('input', () => {
                
                inputs.forEach(el => {
                    if(el.getAttribute('type') == 'text') {
                        el.setAttribute('value', inputItem.value);
                    }
                })
            })
        }
    })
})