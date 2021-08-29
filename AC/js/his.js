const tabParent = document.querySelector('.history-date ul');
    const tabItem = tabParent.querySelectorAll('li');
    const historySection = document.querySelectorAll('.about-date');

    tabParent.addEventListener('click', (e) => {
        tabItem.forEach(item => {
            item.classList.remove('active')
            if(e.target === item) {
                item.classList.add('active')
                historySection.forEach(section => {
                    section.classList.remove('vis');
                    if(item.getAttribute('data-his') == section.getAttribute('data-his')) {
                        section.classList.add('vis');
                    }
                })
            }
        })
    })