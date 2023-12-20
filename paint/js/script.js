// // Базовые настройки редактора
// let config = {
//     lineWidth: 5,
//     color: '#000000'
// }

// document.addEventListener('DOMContentLoaded', () => {

//     // Получение основных элементов
//     const canvas = document.querySelector('#canvas'),
//           ctx = canvas.getContext('2d');

//     // Переменные позиций x и y
//     const isRec = false,
//           newDraw = false,
//           posX = [],
//           posY = [];

//     // Установка размеров canvas
//     canvas.setAttribute('width', window.innerWidth);
//     canvas.setAttribute('height', window.innerHeight);

//     // Устанавливаем базовые настройки
//     ctx.lineWidth = config.lineWidth;
//     ctx.lineJoin = 'round';
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = config.color;
//     ctx.fillStyle = config.color;

//     // Функция рисования
//     const drawLine = (x, y) => {
//         ctx.lineTo(x, y);
//         ctx.stroke();
//     }

//     // Функция окончания рисования
//     const stopDrawing = () => {
//         canvas.onmousemove = null;

//         posX.push(undefined);
//         posY.push(undefined);
//     }

//     // Обрабатываем события на canvas
//     canvas.addEventListener('mousedown', (e) => {
//         if(isRec) return;

//         clearCanvas();
//         canvas.addEventListener('mousemove', (e) => {
//             recordMousePos(e);
//         })
//     })

//     canvas.addEventListener('mouseup', stopDrawing);


//     // Функция записи позициии
//     const recordMousePos = (e) => {
//         posX.push(e.clientX);
//         posY.push(e.clientY);

//         drawLine(e.clientX, e.clientY);
//     }

//     // Функция очистки canvas
//     const clearCanvas = () => {
//         if(newDraw) {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             newDraw = false;

//             if(sketch != null) {
//                 sketch.style.visability = 'visible';
//             }
//         }
//     }
// })


// Настройки
let lineWidth = 5;
let color = '#000000';
let eraser = false;


// Функция удаления всех активных элементов
const removeAllActive = (elements) => {
    elements.forEach(el => {
        el.classList.remove('active');
    })
}


// Функция изменения ширины линии
const lineWidthItems = document.querySelectorAll('.line-width__item'),
      lineWidthInput = document.querySelector('#line-width__input');

lineWidthInput.addEventListener('change', () => {
    lineWidth = lineWidthInput.value;
})

lineWidthItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        removeAllActive(lineWidthItems);

        if(i < lineWidthItems.length - 1) {
            lineWidthInput.classList.remove('active');
            lineWidthInput.value = '';
            item.classList.add('active')

            lineWidth = (i * 2) + 5;
            lineWidthInput.setAttribute('placeholder', lineWidth);
        } else {
            lineWidthInput.classList.add('active');
        }
    })
})


// Функция изменения цвета
const colorsItems = document.querySelectorAll('.colors__item'),
      colorsInput = document.querySelector('#colors__select-input');

colorsInput.addEventListener('input', () => {
    document.querySelector('.colors__select > span').style.background = colorsInput.value;
    color = colorsInput.value;
})


colorsItems.forEach((item, i) => {
    item.addEventListener('click', () => {
        removeAllActive(colorsItems);

        item.classList.add('active');

        if(i == colorsItems - 1) {
            return;
        } else {
            const span = item.querySelector('span');
            color = window.getComputedStyle(span).getPropertyValue('background-color');
        }
    })
})


// Функция ластика
const buttons = document.querySelectorAll('.tool__item > button');

buttons.forEach((item, i) => {
    item.addEventListener('click', () => {
        removeAllActive(buttons);
        item.classList.add('active');

        if(i == 0) {
            eraser = false;
        } else {
            eraser = true;
        }
    })
})


// Получаем canvas
const canvas = document.querySelector('#canvas'),
      ctx = canvas.getContext('2d');


let isDrawing = false;


// Даем размеры после загрузки
window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})


// Начало рисования
const startDraw = () => {
    isDrawing = true;
    ctx.beginPath();

    ctx.lineWidth = lineWidth;

    if(eraser) {
        ctx.strokeStyle = '#ffffff';
    } else {
        ctx.strokeStyle = color;
    }
}


// Функция рисования
const drawing = (e) => {
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}


// Обрабатываем нажатия на мышь
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', drawing);
canvas.addEventListener('mouseup', () => isDrawing = false);


// Сохранение canvas
const saveButton = document.querySelector('.save-button');

saveButton.addEventListener('click', () => {
    const link = document.createElement('a');

    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})
