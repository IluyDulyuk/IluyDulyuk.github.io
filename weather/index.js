const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetales = document.querySelector('.weather-detales');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const _APIKEY = '0a04b7bd8fb14a0acae2bf93453ebaca';
    const city = document.querySelector('.search-box input').value;

    if(city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${_APIKEY}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if(json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetales.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const humidity = document.querySelector('.weather-detales .humidity span');
            const wind = document.querySelector('.weather-detales .wind span');

            switch(json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Haze':
                    image.src = 'images/haze.png';
                    break;

                default:
                    img.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} км/ч`;

            weatherBox.style.display = '';
            weatherDetales.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetales.classList.add('fadeIn');

            container.style.height = '590px';
        })

})