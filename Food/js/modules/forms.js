import {openModal} from './modal';
import {closeModal} from './modal';
import {postData} from '../services/services.js';

const forms = function () {
    const forms = document.querySelectorAll('form');

    const message = {
        a: 'Успешно',
        b: 'img/form/spiner.svg',
        с: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    }) 



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.b;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showResponseModal(message.a);
                statusMessage.remove();
            }).catch(() => {
                showResponseModal(message.c);
            }).finally(() => {
                form.reset();
            });
        });
    }

    

    function showResponseModal (messege) {
        let prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        openModal('.modal');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${messege}</div>
            </div>
        `

       document.querySelector('.modal').append(thanksModal);

       setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
       }, 4000)
    }
}

export default forms;