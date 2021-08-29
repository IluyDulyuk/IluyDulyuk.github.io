const pamItem = document.querySelectorAll('.pamyt-item'),
          pamItemBtn = document.querySelectorAll('.more-btn');
    
    pamItem.forEach(item => {
        item.addEventListener('click', () => {
            pamItemBtn.forEach(btn => {
                if(item.getAttribute('data-pam') === btn.getAttribute('data-pam')) {
                    if(item.classList.contains('active')) {
                        item.classList.remove('active')
                        btn.textContent = 'Больше'
                    } else {
                        item.classList.add('active')
                        btn.textContent = 'Меньше'
                    }
                }
            })
        })
    })