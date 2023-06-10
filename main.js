const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');


search.addEventListener('click', ()=>{
    const APIKey = '53ec8489f4670e9341233d4f0b47f135';
    const city = document.querySelector('.search-box input').value;

    if(city === ''){
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            notFound.style.display = 'block';
            notFound.classList.add('fadeIn');
            return;
        }

        notFound.style.display = 'none';
        notFound.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'img/clear.png';
                break;
            case 'Rain':
                image.src = 'img/rain.png';
                break;
            case 'Clouds':
                image.src = 'img/cloud.png';
                break;
            case 'Haze':
                image.src = 'img/mist.png';
                break;
            case 'Snow':
                image.src = 'img/snow.png';
                break;
            default:
                image.src = '';
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Км/ч`;
        
        weatherBox.style.display = '';
        weatherBox.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    })
});