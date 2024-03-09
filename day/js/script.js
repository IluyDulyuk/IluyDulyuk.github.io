var taskDescriptions = {
  taskA: "два натуральных числа меньше миллиарда через пробел",
  taskB: "одно целое неотрицательное число меньше миллиарда",
  taskC: "два целых неотрицательных числа через пробел",
  taskD: "два натуральных числа до 100 через пробел",
  taskE: "строка из латинских букв, 30 символов максимум",
  taskF: "строка из латинских букв, 20 символов максимум",
  taskG: "одно натуральное число меньше 100",
  taskH: "одно натуральное число не больше 2500",
 };

function changeText() {
  var select = document.getElementById("task");
  var div = document.getElementById("input_format");
  var selectedValue = select.value;
  var description = taskDescriptions[selectedValue];
  div.innerHTML = "<span>Вход:</span> " + description;
  document.getElementById('result').innerHTML = ""
}

// Вызов функции changeText() при загрузке документа
window.onload = function () {
  changeText();

  document.getElementById('fire').addEventListener('click', function () {
    var bodyElement = document.body;
    var switchElement = document.getElementById('switch');

    document.getElementById('fire').classList.toggle('day');

    if (bodyElement.classList.contains('fire-off')) {
        bodyElement.classList.remove('fire-off');
        switchElement.classList.remove('switched');
    } else {
        bodyElement.classList.add('fire-off');
        switchElement.classList.add('switched');
    }
});
};

const backback = document.querySelector('.backpack');

backback.addEventListener('click', () => {
  backback.classList.toggle('jump');
})

function getDataFromPython() {
  const url = '/cgi-bin/nyvkoshp/test.py';
  document.getElementById('result').innerText = "Запускаем..."
  document.getElementById('start').disabled = true
  document.getElementById('result').className = "terminal-alert"
  const user_input = document.getElementById('user_input').value;
  const task = document.getElementById('task').value;

  // Data to send to the Python script
  const data = {input: user_input, task: task};

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'data=' + encodeURIComponent(JSON.stringify(data)),
  })
  .then(response => response.json())
  .then(result => {
      // Update the result in the HTML
      if (result.status != "OK"){
           document.getElementById('result').className = "terminal-alert terminal-alert-error"
      }
      document.getElementById('result').innerHTML = "Результат работы программы:\n\n" + result.output;
  })
  .catch(error => {
      console.error('Error:', error);

  })
  .finally(() => {
      setTimeout(() => {
         console.log("Delayed for 1 second.");
         document.getElementById('start').disabled = false
      }, 700);

  })
}

var canvas = document.querySelector("#town"),
ctx = canvas.getContext('2d'),
data, canvas2, ctx2, rafAnim = null;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth,
amount = 1000;
var img = new Image();
img.onload = function() {
ctx.drawImage(img, 0, 0, 800, 800, 0, 0, canvas.width, canvas.height);
data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
canvas2 = document.querySelector("#snowFlakes");
ctx2 = canvas2.getContext('2d');
canvas2.width = canvas.offsetWidth;
canvas2.height = canvas.offsetWidth;
initSnow();
}
img.crossOrigin = "Anonymous";
img.src = "./svg/town.svg";

var flakes;

function initSnow() {
//window.addEventListener("click", shakeGlobe);
//window.addEventListener("touchstart", shakeGlobe);
ctx2.fillStyle = "rgba(255,255,255,0.7)";
var radius = canvas.width * 0.2875;
var offsetX = canvas.width / 2;
var offsetY = canvas.width * 0.4;
flakes = [];
for (var i = 0; i < amount; i++) {
  x = Math.random() * 2 * radius - radius;
  ylim = Math.sqrt(radius * radius - x * x);
  y = Math.random() * ylim - ylim;
  flakes.push(new Flake(x + offsetX, y + offsetY));
}
if (rafAnim === null) {
  rafAnim = requestAnimationFrame(render);
}
}

function Flake(x, y, color) {
this.x = Math.floor(x);
this.y = Math.floor(y);
for (var i = this.y; i < canvas.width; i++) {
  if (data[((this.x + (canvas.width * i)) * 4 + 3)] > 10) {
    destination = parseInt(i - 1);
    i = canvas.width;
  } else {
    destination = canvas.width;
  }
}
this.finalY = destination;
this.r = Math.random() * 2;
this.speedY = Math.random() + 0.2;
}
Flake.prototype.render = function() {
if (this.finalY > this.y) {
  this.y += this.speedY;
}
ctx2.beginPath();
ctx2.arc(this.x, this.y, this.r, Math.PI * 2, false);
ctx2.fill();
}

function render(a) {
requestAnimationFrame(render);
ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
for (var i = 0; i < amount; i++) {
  flakes[i].render();
}


};
