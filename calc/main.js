const typeTabs = document.querySelectorAll('.type__item'),
      house = document.querySelector('.house'),
      foundation = document.querySelector('.foundation'),
      materialTabs = document.querySelectorAll('.material__item');

typeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        typeTabs.forEach(item => {
            item.classList.remove('active');
        })

        tab.classList.add('active');
        house.style.display = 'none';
        foundation.style.display = 'none';

        if(tab.getAttribute('data-name') == 'house') {

            materialTabs.forEach(item => {
                item.addEventListener('click', () => {
                    materialTabs.forEach(el => {
                        el.classList.remove('active')
                    })

                    item.classList.add('active')
                })
            })

            house.style.display = 'block';
        }

        if(tab.getAttribute('data-name') == 'foundation') {

            materialTabs.forEach(item => {
                item.addEventListener('click', () => {
                    materialTabs.forEach(el => {
                        el.classList.remove('active')
                    })

                    item.classList.add('active')
                })
            })

            foundation.style.display = 'block';
        }
    })
})