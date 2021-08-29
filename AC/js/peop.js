const boxValue = document.querySelector('.box-value'),
      triggerBox = document.querySelector('.box img'),
      boxHide = document.querySelector('.box-hide'),
      boxList = document.querySelector('.box-list'),
      boxListItem = boxList.querySelectorAll('li'),
      peopItemsList = document.querySelectorAll('.peop-item');



triggerBox.addEventListener('click', () => {
    if(boxHide.classList.contains('hide')) {
        boxHide.classList.add('show');
        boxHide.classList.remove('hide');
    } else {
        boxHide.classList.remove('show');
        boxHide.classList.add('hide');
    }
})

boxList.addEventListener('click', (e) => {
    boxListItem.forEach(item => {
        if(item == e.target) {
            peopItemsList.forEach(section => {
                section.classList.remove('vis');
                boxHide.classList.remove('show');
                boxHide.classList.add('hide');
                if(item.getAttribute('data-peop') === section.getAttribute('data-peop')) {
                    section.classList.add('vis');
                }
            })
        }
    })
})
