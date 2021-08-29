function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


const modal = function (modalSelector, triggerSelector) {
    const modal = document.querySelector(modalSelector),
          triggerModal = document.querySelectorAll(triggerSelector);
        //   modalCloseBtn = document.querySelector('[data-close]');



    triggerModal.forEach(btn => {
        btn.addEventListener('click', (e) => {
            openModal(modalSelector);
        });
    });

    document.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    })
}

export default modal;
export {openModal};
export {closeModal};