window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.load__tab');
    const contents = document.querySelectorAll('.load__content');

    function removeAllActive(elements) {
        elements.forEach(el => {
            el.classList.remove('active');
        })
    }


    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            removeAllActive(tabs);
            removeAllActive(contents);

            contents.forEach(content => {
                if(tab.getAttribute('data-tab-id') === content.getAttribute('data-tab-id')) {
                    tab.classList.add('active');
                    content.classList.add('active');
                }
            })
        })
    })

})