window.addEventListener('DOMContentLoaded', () => {

    let _LIST = [];
    let _FOUND = [];
    let _RESULT = [];
    let _ADD = [];
    let left = 0;
    let found = 0;
    let add = 0;

    const html5Qrcode = new Html5Qrcode('reader');


    const textForm = document.querySelector('#text-form');
    const fileForm =  document.querySelector('#file-form');
    const textarea = document.querySelector('#textarea');
    const fileInput = document.querySelector('#file');
    const fileButton = document.querySelector('.file__button');
    const tabs = document.querySelectorAll('.load__tab');
    const contents = document.querySelectorAll('.load__content');
    const leftSpan = document.querySelector('#left');
    const foundSpan = document.querySelector('#found');
    const addSpan = document.querySelector('#add');
    const saveButton = document.querySelector('#save');

    function parseList() {
        _LIST = []
        const value = textarea.value;
        _LIST = value.split('\n');
        _LIST = _LIST.filter(item => item !== '');
        textarea.value = _LIST.join('\n');
        initList();
    }

    function parseFile() {
        const reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.onload = function() {
            const value = reader.result;
            _LIST = value.split('\n');
            _LIST = _LIST.filter(item => item !== '');
            textarea.value = _LIST.join('\n');
            removeAllActive(tabs);
            tabs[0].classList.add('active');
            removeAllActive(contents);
            contents[0].classList.add('active');
            initList();
        }
    }
    
    function onTextForm() {
        parseList();
    }

    function onFileForm() {
        parseFile();
    }

    fileInput.addEventListener('change', (e) => {
        const name = e.target.files[0].name;
        fileButton.textContent = name;
    })    

    function initList() {
        left = _LIST.length;
        found = 0;
        add = 0;

        leftSpan.textContent = left;
    }

    function addFound() {
        left -= 1;
        found += 1;

        leftSpan.textContent = left;
        foundSpan.textContent = found;
    }

    function addAdd() {
        add += 1;

        addSpan.textContent = add;
    }

    function initScanner() {
        const config = {
            fps: 10, 
            qrbox:{
                width: 200, 
                height: 200
            }
        }

        html5Qrcode.start({facingMode: "environment"}, config, onSuccessScan);
    }

    function onSuccessScan(decodedText) {
        
        if(_FOUND.indexOf(decodedText) !== -1) {
            return;
        } else {
            _FOUND.push(decodedText);
            let index = _LIST.indexOf(decodedText);
            
            if(index !== -1) {
                _LIST[index] = `${_LIST[index]} +`;
                addFound();
                _RESULT = _LIST;
                console.log(_RESULT);
                console.log(_ADD);
            } else {
                addAdd();
                _ADD.push(decodedText);
                console.log(_RESULT);
                console.log(_ADD);
            }
        }

    }

    function saveFile() {

        let text = '';
        let result = _RESULT.join('\n');
        let addText = '';

        if(_ADD.length > 0) {
            addText = `Доп: \n ${_ADD.join('\n')}`;
        }

        text = `${result} \n \n ${addText}`;


        let a = document.createElement("a");
        let file = new Blob([text]);
        a.href = URL.createObjectURL(file);
        a.download = "результат.txt";
        a.click();
    }


    saveButton.addEventListener('click', () => {
        saveFile();
    })

    textForm.addEventListener('submit', (e) => {
        e.preventDefault();
        onTextForm();
    })

    fileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        onFileForm();
    })
    
    initScanner();





    function removeAllActive(elements) {
        elements.forEach(el => {
            el.classList.remove('active');
        })
    }

})