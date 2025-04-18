// Получаем все что нужно из верстки
const infoLeftSpan = document.querySelector("#left");
const infoFoundSpan = document.querySelector("#found");
const infoAdditionSpan = document.querySelector("#add");
const textForm = document.querySelector("#text-form");
const textFormInput = textForm.querySelector("textarea");
const textInputs = document.querySelectorAll('textarea');
const copyButtons = document.querySelectorAll('.button.copy');
const resetButtons = document.querySelectorAll('.button.reset');

// Глобальные переменные

let LIST = [];
let RESULT = {
  enterd: [],
  addition: [],
};
let FOUND = [];
let SCANNED = [];

// Функия инициализации глобальных переменных

function initGlobalVars() {
  if (localStorage.getItem("list")) {
    LIST = JSON.parse(localStorage.getItem("list"));
    RESULT = JSON.parse(localStorage.getItem("result"));
    FOUND = JSON.parse(localStorage.getItem("found"));
    SCANNED = JSON.parse(localStorage.getItem("scanned"));
  }
}

initGlobalVars();

// Функция заполнения текстового инпута

function fillTextFormInput() {
  textInputs[0].value = '';

  RESULT.enterd.forEach((item, i) => {
    if(i == 0) {
      textInputs[0].value = textInputs[0].value + item;
    } else {
      textInputs[0].value = textInputs[0].value + '\n' + item;
    }
  })

  RESULT.addition.forEach((item, i) => {
    if(i == 0) {
      textInputs[0].value = textInputs[0].value + '\n\n' + 'Доп: \n' + item;
    } else {
      textInputs[0].value = textInputs[0].value + '\n' + item;
    }
  })
}

function fillScanned() {
  textInputs[1].value = '';

  if(SCANNED) {
    SCANNED.forEach((item, i) => {
      if(i == 0) {
        textInputs[1].value = textInputs[1].value + item;
      } else {
        textInputs[1].value = textInputs[1].value + '\n' + item;
      }
    })
  }
} 

fillTextFormInput();
fillScanned();

// Функция заполнения информацией

function fillInfo() {
  const leftItems = RESULT.enterd.filter((item) => item.indexOf("+") === -1);
  infoLeftSpan.textContent = leftItems.length;

  const foundedItems = RESULT.enterd.filter((item) => item.indexOf("+") !== -1);
  infoFoundSpan.textContent = foundedItems.length;

  infoAdditionSpan.textContent = RESULT.addition.length;
}

fillInfo();

// Добавление в localStorage

function addToLocalStorage() {
  localStorage.setItem("list", JSON.stringify(LIST));
  localStorage.setItem("result", JSON.stringify(RESULT));
  localStorage.setItem("found", JSON.stringify(FOUND));
  localStorage.setItem("scanned", JSON.stringify(SCANNED));
}

// Функция валидации инпута
function validateTextFormInput() {
  const value = textFormInput.value.split("\n").filter((item) => item !== "");
  textFormInput.value = value.join("\n");
}

// Функция заполнения переменных из инпута

function fillGlobalVarsFromFormTextInput() {
  LIST = textFormInput.value.split("\n");
  LIST = LIST.map((item) => item.trim());
  LIST = LIST.filter((item) => item !== "");
  RESULT.enterd = [...LIST];
  RESULT.addition = [];
  FOUND = [];

  fillInfo();
  addToLocalStorage();
}

// Переключение табов

const tabs = document.querySelectorAll(".load__tab");
const contents = document.querySelectorAll(".load__content");

function removeAllActive(items) {
  items.forEach((item) => {
    item.classList.remove("active");
  });
}

function changeTabs() {
  removeAllActive(tabs);
  removeAllActive(contents);
  tabs[0].classList.add("active");
  contents[0].classList.add("active");
}

// Заполняем textarea

function fillTextarea() {
  textInputs[0].value = '';

  RESULT.enterd.forEach((item, i) => {
    if(i == 0) {
      textInputs[0].value = textInputs[0].value + item;
    } else {
      textInputs[0].value = textInputs[0].value + '\n' + item;
    }
  })

  RESULT.addition.forEach((item, i) => {
    if(i == 0) {
      textInputs[0].value = textInputs[0].value + '\n\n' + 'Доп: \n' + item;
    } else {
      textInputs[0].value = textInputs[0].value + '\n' + item;
    }
  })
}

// Функция удачного сканирования

function onSuccessScan(decodedText) {
  let text = decodedText.split(":")[2];

  if(tabs[0].classList.contains('active')) {
    if (FOUND.indexOf(text) === -1) {
      FOUND.push(text);

      const index = RESULT.enterd.indexOf(text);

      if (index !== -1) {
        RESULT.enterd[index] += " +";
      } else {
        RESULT.addition.push(text);
      }
    }

    fillInfo();
    addToLocalStorage();
    fillTextarea();
  } else {
    if(SCANNED.indexOf(text) === -1) {
      SCANNED.push(text);
      addToLocalStorage();
      fillScanned();
    }
  }
}

// Функция инициализации сканера

function initScanner() {
  const config = {
    fps: 10,
    qrbox: {
      width: 130,
      height: 130,
    },
  };

  const html5Qrcode = new Html5Qrcode("reader");
  html5Qrcode.start({ facingMode: "environment" }, config, onSuccessScan);
}

initScanner();

// Обработка textForm

textForm.addEventListener("submit", (e) => {
  e.preventDefault();

  validateTextFormInput();
  fillGlobalVarsFromFormTextInput();
  textInputs[0].readOnly = true;
});

// Копирование

copyButtons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');

    textInputs.forEach(input => {
      if(input.getAttribute('data-id') === id) {
        navigator.clipboard.writeText(input.value);
        button.textContent = 'Текст скопирован!'

        setTimeout(() => {
          button.textContent = 'Скопировать';
        }, 3000);
      }
    })
  })
})

resetButtons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');

    textInputs.forEach(input => {
      if(input.getAttribute('data-id') === id) {
        if(id === 'textarea-1') {
          textInputs[0].value = '';

          LIST = [];
          RESULT = {
            enterd: [],
            addition: [],
          };
          FOUND = [];

          localStorage.removeItem('found');
          localStorage.removeItem('list');
          localStorage.removeItem('result');

          fillInfo();

          textInputs[0].readOnly = false;
        }        
      } else {
        textInputs[1].value = '';

        SCANNED = [];

        localStorage.removeItem('scanned');
      }
    })
  })
})
